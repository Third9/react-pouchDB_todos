import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.todo = this.props.todo;
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.todoDbClicked = this.todoDbClicked.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.todoKeyPressed = this.todoKeyPressed.bind(this);
    this.todoBlurred = this.todoBlurred.bind(this);
  }

  handleCheckbox() {
    let todo = this.todo;
  }

  todoDbClicked() {
    let todo = this.todo;
  }

  handleDelete() {
    let todo = this.todo;
  }

  todoKeyPressed() {
    let todo = this.todo;
  }

  todoBlurred() {
    let todo = this.todo;
  }

  render() {
    let todoId = `li_${this.todo._id}`;
    let inputId = `input_${this.todo._id}`;

    return(
      <li id={todoId}
          className= {this.todo.completed ?
                          'completed'
                          : null
          }
      >
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 onChange={this.handleCheckbox}
                 checked={this.todo.completed ? true:false}
          />
          <label onDoubleClick={this.todoDbClicked}>{this.todo.title}</label>
          <button className='destroy'
                  onClick={this.handleDelete}
          />
        </div>
        <input id={inputId}
               className='edit'
               value={this.todo.title}
               onKeyPress={this.todoKeyPressed}
               onBlur={this.todoBlurred}
        />
      </li>
    )
  }
}

export default TodoItem
