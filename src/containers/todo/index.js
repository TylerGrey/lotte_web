import React from "react";
import AddTodo from "./addTodo";
import TodoList from "./todoList";
import VisibilityFilters from "./visibilityFilters";
import "./styles.css";

export default function Todo() {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
