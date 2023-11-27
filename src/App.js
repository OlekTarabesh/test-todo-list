import { useEffect, useState } from "react";
import TodoList from "./components/TodoList/TodoList";
import Pagination from "./components/Pagination/Pagination";
import Header from "./components/Header/Header";

import styled from "./app.module.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const getTodos = async () => {
    const url = "https://jsonplaceholder.typicode.com/todos?limit=10";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return setTodos(data);
  };
  useEffect(() => {
    getTodos();
  }, []);

  const lastPost = currentPage * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  const currentPost = todos.slice(firstPost, lastPost);

  const pageToggleHandler = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className={styled.app}>
      <Header />
      <div className={styled.todoList}>
        {currentPost.map((item, i) => {
          return <TodoList key={i} todo={item} />;
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
