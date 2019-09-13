import React, { useMemo, useState, forwardRef } from "react";
import styled, { CSSProperties } from "styled-components";
import categories from "./categories";
import TabContent from "./TabContent";
import Tabs from "./Tabs";

export const EmojiPickerContext = React.createContext(null);

type Props = {
  onPick: (emoji: string) => void;
  isVisible: boolean;
  style?: CSSProperties;
};

const EmojiPicker = ({ onPick, isVisible, style }: Props, ref) => {
  const [currentTab, setTab] = useState(Object.keys(categories)[0]);

  const contextValue = useMemo(() => ({ currentTab, setTab, onPick }), [
    currentTab,
    setTab,
    onPick
  ]);

  return (
    <Root isVisible={isVisible} style={style} ref={ref}>
      <EmojiPickerContext.Provider value={contextValue}>
        <Tabs />
        <TabContent />
      </EmojiPickerContext.Provider>
    </Root>
  );
};

export default forwardRef(EmojiPicker);

const Root = styled.div<{ isVisible: boolean }>`
  width: 300px;
  height: 200px;
  background-color: white;
  border: 1px solid #5a5a5a;
  border-radius: 10px;
  display: ${props => (props.isVisible ? "flex" : "none")};
  flex-direction: column;
  @media (max-height: 700px) {
    height: 150px;
  }
  @media (max-width: 300px) {
    height: 150px;
  }
`;
