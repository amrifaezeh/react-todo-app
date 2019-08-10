import React, { Component } from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react'

import './App.css';

const todos = [
  'Learn React',
  'Learn Redux',
  'Learn React Native',
  'Create a brand new web app!'
]

const TodoItem = ({todo, handleDelete, handleToggle}) => {
  return(  
      <Table.Row
        positive={todo.completed}
      >
        <Table.Cell>
        <Checkbox
          checked={todo.completed}
          onChange={handleToggle}
        />
      </Table.Cell>
      <Table.Cell>
        {todo.title}
        <Button
          color="red"
          icon="trash"
          floated="right"
          compact
          size="small"
          onClick={handleDelete}
        />
      </Table.Cell>
    </Table.Row>
  )
}


class TodoApp extends Component {
  state = {
    todos: [
      { title: 'Learn React', completed: false },
      { title: 'Learn Redux', completed: false },
      { title: 'Learn React Native', completed: false },
      {
        title: 'Create a brand new web app!',
        completed: false,
      },
    ],
    newTodo: '',
  }

  handleToggleAll=() => {
    const [...todos] = this.state.todos
    const allToggled = todos.every(todo => todo.completed)
    const toggledTodos = todos.map(todo =>({...todo,completed: !allToggled}))
    this.setState({ todos: toggledTodos})
  }

  handleTodoClick(todo, index) {
    const { completed } = todo
    const [...todos] = this.state.todos
    todos[index] = {
      ...todo,
      completed: !completed,
    }
    this.setState({ todos })
  }
  handleInputChange = event => {
    const value = event.target.value
    this.setState({ newTodo: value })

  }

  handleNewTodoKeyDown = event => {
    if (this.state.todos.length >= 10) {
      //dont allow more than 10 todos
      return
    }
    if (event.keyCode !== 13) {
      //13 is enter key
      return
    }
    event.preventDefault()

    const { newTodo } = this.state
    const value = newTodo.trim()
    if (value) {
      this.setState({
        todos: [
          ...todos,
          { title: value, completed: false },
        ],
        newTodo: '',
      })
    }
  }

  handleDelete = (i) => {
    const { todos } = this.state
    const todosWithoutDeletedTodo = todos.filter(
      (t, index) =>
        index !== i,
    )
    this.setState({ todos: todosWithoutDeletedTodo })
  }

  handleClearCompleted = () => {
    const { todos } = this.state
    const incomlpeteTodos = todos.filter(todo => ! todo.completed)
    this.setState({ todos: incomlpeteTodos})
  }

  render() {
    const { todos, newTodo } = this.state
    const allToggled = todos.every(todo => todo.completed)
    return (
      <div className="app">
        <div className="todo-container">
          <input id="new-todo"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTodoKeyDown}
          />
          <label htmlFor="new-todo" style={{ display: 'none' }} >New Todo</label>
          {todos.length === 0 ? ( //Checks if the todos array is 0 and starts the parentheses for the true side
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    You have nothing to do!
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          ) : (  // The colon to separate the true side and the false side.  Again, note the parentheses.
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Checkbox
                        checked={allToggled}
                        onChange={this.handleToggleAll}/>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.todos.map((todo, i) => (
                    <TodoItem key={i} todo={todo} handleToggle={()=> this.handleTodoClick(todo, i)}
                    handleDelete={() => this.handleDelete(i)}/>
                  ))}
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2">
                      <Button size="small" onClick={this.handleClearCompleted}>Clear Completed</Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            )} 
            {/* Closing parentheses for false side and closing curly brace for the interpolation */}
        </div>
      </div>
    )
  }
}

// return React.createElement(
//   'div',
//   {
//     className: 'app',
//   },
//   React.createElement(
//     'div',
//     {
//       className: 'todo-container',
//     },
//     todos.map((todo, index) =>
//       React.createElement(
//         'div',
//         {
//           className: 'todo-item-row',
//           key: index,
//         },
//         todo,
//       ),
//     ),
//   ),
// )

export default TodoApp;
