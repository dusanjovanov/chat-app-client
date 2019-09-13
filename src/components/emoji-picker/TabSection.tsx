import React, { MouseEvent, memo, useContext } from "react";
import styled from "styled-components";
import { EmojiPickerContext } from "./EmojiPicker";
import categories from "./categories";

type Props = {
  categoryId: string;
};

const TabSection = ({ categoryId }: Props) => {
  const { currentTab, onPick } = useContext(EmojiPickerContext);

  const onClickEmoji = (e: MouseEvent<HTMLDivElement>) => {
    onPick(e.currentTarget.textContent);
  };

  return (
    <Root isVisible={currentTab === categoryId}>
      {categories[categoryId].emojis.map(e => (
        <Emoji key={e} onClick={onClickEmoji}>
          {e}
        </Emoji>
      ))}
    </Root>
  );
};

export default memo(TabSection);

const Root = styled.div<{ isVisible: boolean }>`
  padding: 5px;
  display: ${props => (props.isVisible ? "flex" : "none")};
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
`;

const Emoji = styled.div`
  font-size: 1.5em;
  text-align: center;
  user-select: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;
