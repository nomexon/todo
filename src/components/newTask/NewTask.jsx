import React, { useState, useEffect } from "react";
import { Button, Space, Input } from "antd";
import { fetchAddTodo, setIsModalVisible } from "../../redux/todo/todosSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { message } from "antd";

export default function NewTask() {
  const isError = useSelector((state) => state.todos.error);

  const [text, setText] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isError !== null) {
  //     message.error(isError, [1]);
  //   }
  // }, [isError]);

  function addTodo() {
    if (text > 0) {
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
