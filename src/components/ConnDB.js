import React from 'react';
import PouchDB from 'pouchdb';

class ConnDB extends React.Component {
  constructor(props) {
    super(props);

    this.db = new PouchDB('todos')
    this.addTodo = this.addTodo.bind(this);
    this.showTodos = this.showTodos.bind(this);
    this.changeTodo = this.changeTodo.bind(this);
    this.checkboxChanged = this.checkboxChanged

    this.state = {
      remoteCouch: false
    }
  }

  showTodos() {
      this.db.allDocs({include_docs: true, descending: true}, (err, doc)=>{
        redrawTodosUI(doc.rows);
      });
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

  checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    this.db.put(todo);
  }

  deleteButtonPressed(todo) {
    this.db.remove(todo);
  }

  changeTodo(){
      this.db.changes({
        since: 'now',
        live: true,
      }).on('change', this.showTodos);
  }

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
  }


  render(){
    return(
      <div>
        conndb
      </div>
    )
  }
}

export default ConnDB
