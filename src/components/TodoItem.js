import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.todoDbClicked = this.todoDbClicked.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.todoKeyPressed = this.todoKeyPressed.bind(this);
    this.todoBlurred = this.todoBlurred.bind(this);
  }

  handleCheckbox(event) {
    let todo = this.props.todo;
    let refTodo = this.refs.todo;

    todo.completed = event.target.checked;
    refTodo.className = event.target.checked ? 'completed': 'none';
    this.props.fnc.handleCreateUpdateDB(todo);
  }

  todoDbClicked() {
    let refTodo = this.refs.todo;
    let refTitle = this.refs.todoTitle;

    refTodo.className = 'editing';
    refTitle.focus();
  }

  handleDelete() {
    let todo = this.props.todo;
    this.props.fnc.handleDeleteDB(todo);
  }

  todoBlurred(todo) {
      let trimmedText = todo.title;
      if(!trimmedText) {
        this.props.fnc.handleDeleteDB(todo);
      }else {
        todo.title = trimmedText;
        this.props.fnc.handleCreateUpdateDB(todo)
      }
  }

  todoKeyPressed(event) {
    let todo = this.props.todo;
    let refTodo = this.refs.todo;

    if (event.key === 'Enter') {
      let title = event.target.value.trim()
      todo.title = title
      refTodo.className = event.target.checked ? 'completed': 'none';

      this.todoBlurred(todo);
    }
  }

  componentDidMount(){
    let refTodo = this.refs.todo;
    let refTitle = this.refs.todoTitle;

    refTodo.className = this.props.todo.completed ? 'completed': 'none';
    refTitle.value = this.props.todo.title;
  }

  componentDidUpdate(prevProps, prevState) {
    let refTodo = this.refs.todo;
    let refTitle = this.refs.todoTitle;

    refTodo.className = this.props.todo.completed ? 'completed': 'none';
    refTitle.value = this.props.todo.title;
  }


  render() {
    let todoId = `li_${this.props.todo._id}`;
    let inputId = `input_${this.props.todo._id}`;

    return(
      <li ref="todo"
          key={todoId}
          id={todoId}
      >
        <div className='view' >
          <input className='toggle'
                 type='checkbox'
                 onChange={this.handleCheckbox}
                 checked={this.props.todo.completed ? true:false}
          />
          <label onDoubleClick={this.todoDbClicked}>{this.props.todo.title}</label>
          <button className='destroy'
                  onClick={this.handleDelete}
          />
        </div>
        <input ref="todoTitle"
               id={inputId}
               className='edit'
               onKeyPress={this.todoKeyPressed}
               onBlur={this.todoBlurred}
        />
      </li>
    )
  }
}

export default TodoItem
