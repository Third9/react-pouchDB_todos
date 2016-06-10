import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props);

    this.db = this.props.db;
    this.handleTodo = this.handleTodo.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    this.state = {
      todoText: ""
    };
  }

  handleEnter(event) {
      if(event.key === 'Enter') {
        let refNewTodo = this.refs.newTodo;
        let todo = {
          _id: new Date().toISOString(),
          title: event.target.value,
          completed: false
        };
        this.props.onCreate(todo);
        refNewTodo.value = "";
      }
  }

  handleTodo(event) {
      this.setState({
        todoText: event.target.value
      });
  }

  render(){
    return(
      <header id="header">
         <h1>todos</h1>
          <input ref='newTodo'
                 id='new-todo'
                 onKeyPress={this.handleEnter}
                 onChange={this.handleTodo}
                 placeholder="What needs to be done?"
                 autofocus />
      </header>
    )
  }
}

export default Header
