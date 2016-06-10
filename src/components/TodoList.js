import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState){
    return (JSON.stringify(nextProps) != JSON.stringify(this.props))
  }

  render(){
    return(
      <section id="main">
         <ul id="todo-list">
          {
            this.props.todos.map((todo)=>{
              return (<TodoItem todo={todo}
                                fnc={this.props.fnc}
                      />)
            })
          }
         </ul>
      </section>
    )
  }
}

export default TodoList
