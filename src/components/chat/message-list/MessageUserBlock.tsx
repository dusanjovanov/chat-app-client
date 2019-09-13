import React from "react";
import styled from "styled-components";
import Message from "./Message";
import { Message as MessagetType } from "../../../types";
import { useSelector } from "../../../redux/hooks";
import { getLoggedUser } from "../../../redux/selectors";

type Props = {
  userBlock: MessagetType[];
};

const MessageUserBlock = ({ userBlock }: Props) => {
  const loggedUser = useSelector(getLoggedUser);
  const isRight = loggedUser.id === userBlock[0].user.id;

  return (
    <Root isRight={isRight}>
      <NameContainer isRight={isRight}>
        <EmojiAvatar isRight={isRight}>{userBlock[0].user.avatar}</EmojiAvatar>
        <Name>{userBlock[0].user.displayName}</Name>
      </NameContainer>
      {userBlock.map((m, idx) => (
        <Message
          key={m.id}
          message={m}
          isRight={isRight}
          isTopBlock={userBlock.length > 1 && idx === 0}
          isBottomBlock={userBlock.length > 1 && idx === userBlock.length - 1}
          isMiddleBlock={idx > 0 && idx < userBlock.length - 1}
        />
      ))}
    </Root>
  );
};

export default MessageUserBlock;

const Root = styled.div<{
  isRight: boolean;
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const NameContainer = styled.div<{ isRight: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  flex-direction: ${props => (props.isRight ? "row-reverse" : "row")};
`;

const Name = styled.div<{ isRight?: boolean }>`
  font-size: 1em;
  text-align: ${props => (props.isRight ? "right" : "left")};
`;

const EmojiAvatar = styled.div<{ isRight: boolean }>`
  font-size: 1em;
  margin-right: ${props => (props.isRight ? "0" : "5px")};
  margin-left: ${props => (props.isRight ? "5px" : "0")};
`;
