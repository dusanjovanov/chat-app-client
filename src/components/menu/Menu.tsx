import React from "react";
import styled from "styled-components";
import AccountMenu from "./Account";

const Menu = () => {
  return (
    <Root>
      <Heading>Chat 💬</Heading>
      <AccountMenu />
    </Root>
  );
};

export default Menu;

const Root = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 1.5em;
  font-weight: normal;
  margin-left: auto;
`;
