import React from "react";
import styled from "styled-components";
import { useSelector } from "../redux/hooks";
import { getNotification } from "../redux/selectors";

const Notification = () => {
  const { isVisible, text, type } = useSelector(getNotification);

  const getIcon = () => {
    switch (type) {
      case "error":
        return "❗";
      case "success":
        return "✔️";
      default:
        return "";
    }
  };

  return (
    <Root isVisible={isVisible}>
      <Icon>{getIcon()}</Icon>
      <Text>{text}</Text>
    </Root>
  );
};

export default Notification;

const Root = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #2b2b2b;
  display: ${props => (props.isVisible ? "flex" : "none")};
  padding: 10px;
  margin: 0 auto;
  border-radius: 10px;
`;

const Icon = styled.div`
  flex-shrink: 0;
  font-size: 1.1em;
  margin-right: 10px;
`;

const Text = styled.div`
  font-size: 1em;
  color: white;
  flex-grow: 1;
`;
