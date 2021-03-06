import React, { useState } from "react";
import Password from "./Password";
import Whishlist from "./Whishlist";
import UserNav from "../../components/nav/UserNav";
import History from "./History";
import { Row } from "antd";

const UserMain = ({ compo = 0 }) => {
  const [componentNo, setComponentNo] = useState(0);
  const handleClick = (x) => {
    setComponentNo(x);
  };

  var rightSideComponent = [<History />, <Password />, <Whishlist />];
  return (
    <>
      <Row style={{ margin: '5' }}>
        <col-6>
          <UserNav handleClick={handleClick} />
        </col-6>
        <col-15>
          <div>{rightSideComponent[componentNo]}</div>
        </col-15>
      </Row>
    </>
  );
};

export default UserMain;
