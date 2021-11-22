import React from "react";
import { Menu } from "antd";

function AdminNav({ handleClick }) {
  return (
    <>
      <Menu mode="inline" style={{ width: 256, padding: 2 }} defaultSelectedKeys={['1']}>
        <Menu.Item key="1"
          onClick={() => {
            handleClick(0);
          }}
        >
          Admin Dashboard
        </Menu.Item>
        <Menu.Item key="2"
          onClick={() => {
            handleClick(1);
          }}
        >
          Product
        </Menu.Item>
        <Menu.Item key="3"
          onClick={() => {
            handleClick(2);
          }}
        >
          Products
        </Menu.Item>
        <Menu.Item key="4"
          onClick={() => {
            handleClick(3);
          }}
        >
          Category
        </Menu.Item>
        <Menu.Item key="5"
          onClick={() => {
            handleClick(4);
          }}
        >
          Sub Category
        </Menu.Item>
        <Menu.Item key="6"
          onClick={() => {
            handleClick(5);
          }}
        >
          Coupons
        </Menu.Item>
        <Menu.Item key="7"
          onClick={() => {
            handleClick(6);
          }}
        >
          Password
        </Menu.Item>

      </Menu>
    </>
  );
}

export default AdminNav;
