import React, { Component } from "react";
import ItemStatusFilter from "../item-status-filter";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import "./app.css";
import "../app-header/app-header.css";
import ItemAddForm from "../item-add-form";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("DHave a lunch"),
    ],
    term: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      important: !true,
      done: !true,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const arrayMas = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: arrayMas,
      };
    });
  };

  addItem = (text) => {
    //1 task: generate id
    //2 task: add element in array?
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    // 1. update object
    const oldItem = arr[idx];
    oldItem.done = !oldItem.done;
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    //2.construct new array
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, " done") };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "important") };
    });
  };
  onSearchChange = (term) => {
    this.setState({ term });
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length == 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }
  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <div className="app-header d-flex">
          <h1>Todo List</h1>
          <h2>
            {todoCount} more to do, {doneCount} done
          </h2>
        </div>
        <SearchPanel onSearchChange={this.onSearchChange} />
        <ItemStatusFilter
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
