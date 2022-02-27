import React from "react";
import { Space, Button } from "antd";

import s from "./TodoItem.module.css";
import { useDispatch } from "react-redux";
import { fetchDeleteTodo, fetchDoneTodo } from "../../redux/todo/todosSlice";
export default React.memo(function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div className="todo__item">
      <p className={s.todo__text}>{todo.title}</p>
      <Space size="middle">
        <Button
          disabled={todo.completed ? true : false}
          onClick={() => {
            dispatch(fetchDoneTodo(todo.id));
          }}
          type="primary"
        >
          Завершить
        </Button>

        <Button
          onClick={() => {
            dispatch(fetchDeleteTodo(todo.id));
          }}
          type="primary"
        >
          Delete
        </Button>
      </Space>
    </div>
  );
});
