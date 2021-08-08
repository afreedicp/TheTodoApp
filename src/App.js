import "./App.css";

import React, { Component } from "react";
import TodoForm from "./component/todoForm";
class App extends Component {
  render() {
    return (
      <div className="todo-app">
        <TodoForm />
      </div>
    );
  }
}

export default App;
