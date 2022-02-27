import React from "react";
import { List, Spin } from "antd";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function Todolist() {
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);

  let isLoading = false;
  if (status === "loading") {
    isLoading = true;
  }
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <List
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item>
            <TodoItem key={todo.id} todo={todo} />
          </List.Item>
        )}
      />
    </Spin>
  );
}
