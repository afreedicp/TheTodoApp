import React from "react";
import { Component } from "react";

class TodoForm extends Component {
  state = {
    input: "",
    list: [],
    id: "",
    edit: "",
  };
  componentDidMount() {
    const a = localStorage.getItem("list");
    this.setState({ list: JSON.parse(a) });
  }
  handleSubmit = (e) => {
    e.preventDefault();
  };
  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }
  addItem() {
    // create item
    const input = {
      id: 1 + Math.random(),
      value: this.state.input.slice(),
    };
    //copy current
    const list = [...this.state.list];
    //add item
    list.push(input);

    this.setState({ input: "", list }, () => {
      localStorage.setItem("list", JSON.stringify(this.state.list));
    });
  }
  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter((item) => item.id !== id);
    this.setState({ list: updatedList });
  }

  editItem() {
    return (
      <>
        <input
          type="text"
          placeholder="edit the todo"
          value={this.state.edit}
          name="text"
          onChange={(e) => this.setState({ edit: e.target.value })}
        />
      </>
    );
  }
  saveItem(id) {
    const asdeer = this.state.list.findIndex((e) => e.id === id);
    // asdeer[0].value = this.state.edit;
    const virtuallist = this.state.list;
    virtuallist[asdeer].value = this.state.edit;
    this.setState({ list: virtuallist, id: "" });
  }

  render() {
    return (
      <div className="todo-container">
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add a todo"
            value={this.state.input}
            name="text"
            onChange={(e) => this.updateInput("input", e.target.value)}
          />
          <button className="todo-btn" onClick={() => this.addItem()}>
            Add Todo
          </button>
          <ul>
            {this.state.list.map((item) => {
              return (
                <li key={item.id}>
                  {item.id === this.state.id ? this.editItem() : item.value}
                  {item.id === this.state.id ? (
                    <button
                      className="edit-btn btn-secondary"
                      onClick={() => this.saveItem(item.id)}
                    >
                      save
                    </button>
                  ) : (
                    <button
                      className="edit-btn btn-secondary"
                      onClick={() =>
                        this.setState({ id: item.id, edit: item.value })
                      }
                    >
                      edit
                    </button>
                  )}

                  <button
                    className="delete-button btn-danger"
                    onClick={() => this.deleteItem(item.id)}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </form>
      </div>
    );
  }
}

export default TodoForm;
