import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";
export default function Nav() {
  return (
    <div>
      <Space>
        <Button type="link" size="large">
          <NavLink to="/">Todo приложение</NavLink>
        </Button>
        <Button type="link" size="large">
          <NavLink to="/about">О проекте</NavLink>
        </Button>
      </Space>
    </div>
  );
}
