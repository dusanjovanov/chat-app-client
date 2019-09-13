import React from "react";
import styled from "styled-components";
import Menu from "../components/menu/Menu";
import MessageList from "../components/chat/message-list/MessageList";
import InputArea from "../components/chat/input-area/InputArea";
import { RouteComponentProps } from "@reach/router";

const ChatPage = (props: RouteComponentProps) => {
  return (
    <Root>
      <Menu />
      <ChatContainer>
        <MessageList />
        <InputArea />
      </ChatContainer>
    </Root>
  );
};

export default ChatPage;

const Root = styled.div`
  height: 100vh;
`;

const ChatContainer = styled.div`
  height: calc(100vh - 50px);
  width: 40%;
  margin: 0 auto;
  padding: 10px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  @media (max-width: 1500px) {
    width: 50%;
  }
  @media (max-width: 1150px) {
    width: 60%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
