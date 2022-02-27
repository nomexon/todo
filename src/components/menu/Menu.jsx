import React from "react";
import { Select, Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { changeLimit, setIsModalVisible } from "../../redux/todo/todosSlice";
const { Option } = Select;

export default function Menu() {
  const dispatch = useDispatch();

  return (
    <div className="set-limit">
      <Space>
        <h2>Выводить по:</h2>
        <Select defaultValue="10" onChange={(e) => dispatch(changeLimit(e))}>
          <Option value="10">10</Option>
          <Option value="50">50</Option>
        </Select>
        <Button
          type="primary"
          onClick={() => {
            dispatch(setIsModalVisible(true));
          }}
        >
          Добавить задачу
        </Button>
      </Space>
    </div>
  );
}
