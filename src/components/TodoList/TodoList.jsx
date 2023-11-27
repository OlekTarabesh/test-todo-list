import { useEffect, useRef, useState } from "react";
import styled from "./styles.module.css";

export const TodoList = ({ title, todo, removeTask, editTodo }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(title);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };
  const removeTaskHandler = () => {
    removeTask(todo.id);
  };
  const editTodoHandler = () => {
    editTodo(todo.id, value);
    setEdit(false);
  };
  //This pice we need to focuse our input after press 'edit';
  const editTaskInputRef = useRef(null);

  useEffect(() => {
    if (edit) {
      editTaskInputRef?.current?.focus();
    }
  }, [edit]);
  //

  return (
    <>
      {!edit ? (
        <div className={styled.todo}>
          {todo.title}
          <div className={styled.buttons}>
            <button onClick={() => setEdit(true)}>✍🏻</button>
            <button onClick={removeTaskHandler}>❌</button>
          </div>
        </div>
      ) : (
        <div className={styled.todo}>
          <input
            ref={editTaskInputRef}
            type="text"
            value={value}
            onChange={inputHandler}
            className={styled.editInput}
          />
          <div className={styled.buttons}>
            <button onClick={editTodoHandler}>🆗</button>
            <button onClick={() => setEdit(false)}>🚫</button>
          </div>
        </div>
      )}
    </>
  );
};
