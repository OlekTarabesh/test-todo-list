import { useState } from "react";

import { v1 } from "uuid";
import styled from "./styles.module.css";

export const TodoInput = ({ addTask, getTodos }) => {
  const [value, setValue] = useState("");

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const addTaskHandler = () => {
    addTask(value);
    setValue("");
  };

  return (
    <div className={styled.container}>
      <div className={styled.inputAndButton}>
        <input
          id={v1()}
          type="text"
          placeholder={"New Todo..."}
          value={value}
          onChange={inputHandler}
          className={styled.input}
        />
        <div style={{ display: "flex", gap: " 10px" }}>
          <button className={styled.inputButton} onClick={addTaskHandler}>
            <span className={styled.addBtn}>➕</span>
          </button>
          <button className={styled.fetch} onClick={getTodos}>
            fetch todos
          </button>
        </div>
      </div>
    </div>
  );
};
