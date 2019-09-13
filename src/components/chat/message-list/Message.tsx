import React from "react";
import styled, { css } from "styled-components";

const Message = ({
  message,
  isRight,
  isBottomBlock,
  isTopBlock,
  isMiddleBlock
}) => {
  return (
    <>
      <Root
        isRight={isRight}
        bgColor={message.user.colors.bg}
        isBottomBlock={isBottomBlock}
        isMiddleBlock={isMiddleBlock}
        isTopBlock={isTopBlock}
      >
        <Text isRight={isRight} color={message.user.colors.front}>
          {message.text}
        </Text>
      </Root>
    </>
  );
};

export default Message;

const Root = styled.div<{
  isRight: boolean;
  bgColor: string;
  isBottomBlock: boolean;
  isTopBlock: boolean;
  isMiddleBlock: boolean;
}>`
  display: flex;
  border: 1px solid transparent;
  border-radius: 25px;
  padding: 6px 10px;
  background-color: ${props => props.bgColor};
  flex-direction: column;
  // flex-direction: ${props => (props.isRight ? "row-reverse" : "row")};
  width: fit-content;
  max-width: 60%;
  margin-left: ${props => (props.isRight ? "auto" : 0)};
  margin-bottom: 2px;
  ${props => getBorderTopRadius(props)};
  ${props => getBorderBottomRadius(props)};
`;

const Text = styled.div<{ isRight: boolean }>`
  font-size: 1em;
  text-align: ${props => (props.isRight ? "right" : "left")};
  word-break: break-word;
  color: ${props => props.color};
`;

const getBorderTopRadius = ({ isRight, isBottomBlock, isMiddleBlock }) => {
  if (isRight) {
    return css`
      border-top-right-radius: ${isBottomBlock || isMiddleBlock
        ? "5px"
        : "25px"};
    `;
  } else {
    return css`
      border-top-left-radius: ${isBottomBlock || isMiddleBlock
        ? "5px"
        : "25px"};
    `;
  }
};

const getBorderBottomRadius = ({ isRight, isTopBlock, isMiddleBlock }) => {
  if (isRight) {
    return css`
      border-bottom-right-radius: ${isTopBlock || isMiddleBlock
        ? "5px"
        : "25px"};
    `;
  } else {
    return css`
      border-bottom-left-radius: ${isTopBlock || isMiddleBlock
        ? "5px"
        : "25px"};
    `;
  }
};
