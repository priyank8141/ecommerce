import React from "react";
import { Menu } from "antd";

function UserNav({ handleClick }) {
  return (
    <>
      <Menu mode="inline" style={{ width: 256, padding: 2 }} defaultSelectedKeys={['1']}>
        <Menu.Item key="1"
          onClick={() => {
            handleClick(0);
          }}
        >
          History
        </Menu.Item>
        <Menu.Item key="2"
          onClick={() => {
            handleClick(1);
          }}
        >
          Password
        </Menu.Item>
        <Menu.Item key="3"
          onClick={() => {
            handleClick(2);
          }}
        >
          Wishlist
        </Menu.Item>
      </Menu>
    </>
  );
}

export default UserNav;
