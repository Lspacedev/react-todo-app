import "./App.css";

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputVal: "",
      count: 0,
      EditVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({
        id: state.count,
        value: state.inputVal,
        isEdit: false,
      }),
      inputVal: "",
      count: state.count + 1,
    }));
  }

  handleDelete(todo) {
    this.setState((state) => ({
      todos: state.todos.filter((item) => item.value != todo.value),
      inputVal: "",
      count: state.count - 1,
    }));
  }

  handleEdit(id) {
    var todoz = this.state.todos.slice(0);
    var todo = todoz.find((a) => a.id === id);
    todo.isEdit = true;

    this.setState((state) => ({
      todos: todoz,
      inputVal: "",

      count: state.count,
    }));
  }

  handleEditChange(e) {
    this.setState((state) => ({
      ...state,
      EditVal: e.target.value,
    }));
  }

  handleResubmit(e, id) {
    e.preventDefault();
    var todoz = this.state.todos.slice(0);
    var todo = todoz.find((a) => a.id === id);
    todo.isEdit = false;
    todo.value = this.state.EditVal;
    this.setState((state) => ({
      todos: todoz,
      inputVal: "",
      count: state.count,
      EditVal: "",
    }));
  }

  render() {
    return (
      <div className="container">
        <h3>To Do App</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="task-entry">Enter a task: </label>
            <input
              type="text"
              name="task-entry"
              value={this.state.inputVal}
              onChange={this.handleInputChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h4>All the tasks! {this.state.count}</h4>
          <ul>
            {this.state.todos.map((todo) => (
              <li key={todo.id}>
                {todo.isEdit ? (
                  <input
                    value={this.state.EditVal}
                    onChange={this.handleEditChange}
                  />
                ) : (
                  todo.value
                )}
                <button onClick={() => this.handleDelete(todo)}>Delete</button>
                <button
                  onClick={(e) =>
                    todo.isEdit
                      ? this.handleResubmit(e, todo.id)
                      : this.handleEdit(todo.id)
                  }
                >
                  {todo.isEdit ? "Resubmit" : "Edit"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
