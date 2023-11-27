import { useEffect, useState } from "react";

import { Header, Pagination, TodoInput, TodoList } from "./components";

import { v1 } from "uuid";
import styled from "./app.styles.module.css";

function App() {
  //Here we get data from our localStorage.
  const getLocalstorage = () => {
    let todo = window.localStorage.getItem("todos");
    if (todo) {
      return (todo = JSON.parse(localStorage.getItem("todos") || "[]"));
    } else {
      return [];
    }
  };

  const [todos, setTodos] = useState(getLocalstorage());
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const getTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      localStorage.setItem("todos", JSON.stringify(data));
      console.log("Data fetched and stored in local storage:", data);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    //We need this for set our todos in localStorage
    if (todos.length !== 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    setTodos(todos);
  }, [todos]);

  //For pagination👇🏻
  const lastPost = currentPage * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  const currentPost = todos.slice(firstPost, lastPost);

  const pageToggleHandler = (page) => {
    setCurrentPage(page);
  };
  //

  const addTask = (value) => {
    const newTask = {
      id: v1(),
      title: value,
    };
    if (newTask.title.trim() === "") {
      return;
    } else {
      let newTasks = [newTask, ...todos];
      setTodos(newTasks);
    }
  };

  const removeTask = (id) => {
    const filteredTask = todos.filter((t) => t.id !== id);
    if (window.confirm("Are you sure?")) {
      setTodos(filteredTask);
    }
  };

  const editTodo = (id, title) => {
    const editingTodo = todos.map((todo) => ({
      ...todo,
      title: todo.id === id ? title : todo.title,
    }));
    setTodos([...editingTodo]);
  };

  return (
    <div className={styled.app}>
      <Header />
      <TodoInput addTask={addTask} getTodos={getTodos} />
      <div className={styled.todoList}>
        {currentPost.map((item, i) => {
          return (
            <TodoList
              key={i}
              todo={item}
              title={item.title}
              removeTask={removeTask}
              editTodo={editTodo}
            />
          );
        })}
      </div>
      <Pagination
        totalTodos={todos.length}
        postsPerPage={postsPerPage}
        pageToggleHandler={pageToggleHandler}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
