import React from 'react';

import PouchDB from 'pouchdb';
import _ from 'underscore';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import Info from './Info';

class TodoApp extends React.Component {
  constructor(props){
    super(props);

    this.db = new PouchDB('todos');
    this.addTodo = this.addTodo.bind(this);
    // this.changeTodo = this.changeTodo.bind(this);
    this.checkboxChanged = this.checkboxChanged.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      remoteCouch: false,
      todos: []
    };
  }

  // changeTodo(){
  //     this.db.changes({
  //       since: 'now',
  //       live: true,
  //     }).on('change', this.showTodos);
  // }

  addTodo(text) {
      let todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
      };

      this.db.put(todo, function callback(err, result){
        if(!err) {
          console.log("Successfully posted a todo!");
        }
      });

      // this.showTodos();
  }

  updateState(err, doc){
    this.setState({
      todos: _.map(doc.rows, function(row) { return row.doc; })
    });
  }

  componentDidMount(){
    this.db.allDocs({include_docs: true, descending: true},
                    this.updateState);
  }

  // componentWillUpdate(nextProps, nextState){
  //   this.db.allDocs({include_docs: true, descending: true},
  //                   this.updateState);
  // }

  checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    this.db.put(todo);
  }

  deleteButtonPressed(todo) {
    this.db.remove(todo);
  }

  todoBlurred(todo, event) {
      let trimmedText = event.target.value.trim();
      if(!trimmedText) {
        this.db.remove(todo);
      }else {
        todo.title = trimmedText;
        db.put(todo);
      }
  }

  render(){
    return(
      <div>
        <section id="todoapp">
          <Header db={this.db}
                  onClick={this.addTodo}/>
          <TodoList todos={this.state.todos} />
          <Footer />
        </section>
        <Info />
      </div>
    )
  }
}

export default TodoApp
