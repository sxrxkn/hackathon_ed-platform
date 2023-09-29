import React from "react";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <HeadBar>
      <div>
        <p>Учебная платформа</p>
      </div>
      <Navigation>
        <Button icon={<UserOutlined />}></Button>
        <Button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          icon={<LogoutOutlined />}
        ></Button>
      </Navigation>
    </HeadBar>
  );
}

const HeadBar = styled.header`
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 86%;
  margin: 0 auto;
  height: 64px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export default Header;
