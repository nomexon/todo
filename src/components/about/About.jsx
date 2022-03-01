import React from "react";
import { List } from "antd";

import s from "./about.module.css";

export default function About() {
  const data = [
    "Проект сделан на react/redux технологии.",
    "Используются redux-toolkit, react hooks,react-router-dom",
    "Асинхроные запросы к постороннему api JSONPlaceholder",
    "Обработка ошибок от сервера",
    "Можно добавлять, удалять, изменять статус задач",
    "Можно изменить кол-во подгружаемых задач с 10 до 50",
    "Стили применены из Antd",
  ];
  return (
    <>
      <List
        className={s.li__item}
        size="large"
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
}
