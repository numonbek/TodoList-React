import React, { Component } from "react";
import "./app-header.css";

export default class AppHeader extends Component {
  render() {
    const { todoCount, doneCount } = this.props;

    return (
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>
          {todoCount} more to do, {doneCount} done
        </h2>
      </div>
    );
  }
}
