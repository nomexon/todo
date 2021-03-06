import React, { useState } from "react";
import { Button, Space, Input } from "antd";
import { fetchAddTodo } from "../../redux/todo/todosSlice";
import { useDispatch } from "react-redux";

export default function NewTask() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function addTodo() {
    if (text.length > 0) {
      dispatch(fetchAddTodo(text));
      setText("");
    }
  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Добавить новую задачу</h2>

      <Input
        autoFocus
        placeholder="Введите новую задачу"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Space
        align="center"
        direction="vertical"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <Button type="primary" onClick={addTodo}>
          Добавить
        </Button>
      </Space>
    </>
  );
}
