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

  handleEnter(evt) {
      if(evt.key === 'Enter') {
        // this.db.info().then(function(info) {
        //   console.log(`info: ${info}`);
        // })
        this.props.onClick(evt.target.value);
      }
  }

  handleTodo(evt) {
      console.log(`evt: ${evt}`);
      this.setState({
        todoText: evt.target.value
      });
  }

  render(){
    return(
      <header id="header">
         <h1>todos</h1>
          <input id='new-todo' onKeyPress={this.handleEnter} onChange={this.handleTodo} placeholder="What needs to be done?" autofocus />
      </header>
    )
  }
}

export default Header
