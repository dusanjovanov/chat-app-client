import React, { memo, useContext } from "react";
import styled from "styled-components";
import { EmojiPickerContext } from "./EmojiPicker";
import categories from "./categories";
import Tab from "./Tab";

const Tabs = () => {
  const { currentTab, setTab } = useContext(EmojiPickerContext);

  const onClick = (id: string) => () => setTab(id);

  return (
    <Root>
      {Object.keys(categories).map(k => (
        <Tab
          key={k}
          isActive={currentTab === k}
          category={categories[k]}
          onClick={onClick(k)}
        />
      ))}
    </Root>
  );
};

export default memo(Tabs);

const Root = styled.div`
  display: flex;
`;
