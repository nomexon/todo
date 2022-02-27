import { useEffect, useState } from "react";

import { List, Button, Modal, Spin, message } from "antd";
import {
  fetchTodos,
  fetchMore,
  setIsModalVisible,
} from "./redux/todo/todosSlice";

import NewTask from "./components/newTask/NewTask";
import Menu from "./components/menu/Menu";

import { useDispatch, useSelector } from "react-redux";
import Todolist from "./components/todoList/Todolist";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.todos.limit);
  const isModalOpen = useSelector((state) => state.todos.isModalOpen);
  const limitMore = useSelector((state) => state.todos.limitMore);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <div className="add__item">
        <h1>Список задач</h1>
        <Menu />
      </div>

      <Todolist />

      <div className="loading">
        {limitMore < 200 ? (
          <Button onClick={() => dispatch(fetchMore())} type="primary">
            Загрузить еще {limit}
          </Button>
        ) : (
          ""
        )}
      </div>
      <Modal
        footer={null}
        onCancel={() => {
          dispatch(setIsModalVisible(false));
        }}
        title="Добавить новую задачу"
        visible={isModalOpen}
      >
        <NewTask />
      </Modal>
    </div>
  );
}

export default App;
