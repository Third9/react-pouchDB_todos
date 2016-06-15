import React from 'react';

import PouchDB from 'pouchdb';
import _ from 'underscore';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import Info from './Info';
// import Sync from './sync';

class TodoApp extends React.Component {
  constructor(props){
    super(props);

    this.db = new PouchDB('todos', { storage: 'persistent', revs_limit:1 });
    this.remoteCouch = 'http://admin:kwon0302@127.0.0.1:5984/todos/';

    this.showTodos = this.showTodos.bind(this);
    this.updateState = this.updateState.bind(this);

    this.replicateTo = this.replicateTo.bind(this);
    this.replicateFrom = this.replicateFrom.bind(this);

    this.fnc = Object();
    this.fnc.handleCreateUpdateDB = this.handleCreateUpdateDB.bind(this);
    this.fnc.handleDeleteDB = this.handleDeleteDB.bind(this);

    this.state = {
      todos: []
    };
  }

  replicateTo(opts, syncError) {
    this.db.replicate.to(this.remoteCouch, opts, syncError);
  }

  replicateFrom(opts, syncError) {
    this.db.replicate.from(this.remoteCouch, opts, syncError);
  }

  handleCreateUpdateDB(todo){
      let _id = todo._id;

      this.db.put(todo, function callback(err, result){
        if(!err) {
          console.log(`Successfully created/updated a todo: id(${_id})`)
        } else {
          console.log(`Failed created/updated a todo: id(${_id})`)
        }
      });
  }

  updateState(err, doc){
    this.setState({
      todos: _.map(doc.rows, function(row) { return row.doc; })
    });
  }

  showTodos() {
    this.db.allDocs({include_docs: true, descending: true},
                    this.updateState);
  }

  handleDeleteDB(todo) {
    this.db.remove(todo, function callback(err, result){
      if(!err) {
        console.log('Successfully')
      }
    });
  }

  componentDidMount(){
    this.showTodos();
    // this.sync();
  }

  componentDidUpdate(nextProps, nextState) {
    let change = this.db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', this.showTodos)
    .on('error', function(err) {
      console.log("err");
    });
    console.log("componentDidUpdate")
  }

  render(){
    return(
      <div>
        <section id="todoapp">
          <Header db={this.db}
                  onCreate={this.fnc.handleCreateUpdateDB}/>
          <TodoList todos={this.state.todos}
                    fnc={this.fnc}
          />
          <Footer onReplicateTo={this.replicateTo}
                  onReplicateFrom={this.replicateFrom}
          />
        </section>
        <Info />
      </div>
    )
  }
}

export default TodoApp
