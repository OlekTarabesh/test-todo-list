import styled from "./styles.module.css";
const TodoList = ({ todo }) => {
  return <div className={styled.todo}>{todo.title}</div>;
};

export default TodoList;
