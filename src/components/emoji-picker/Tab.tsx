import React, { MouseEvent } from "react";
import styled from "styled-components";
import categories from "./categories";

type Props = {
  isActive: boolean;
  category: typeof categories.smileys;
  onClick: (e: MouseEvent) => void;
};

const Tab = ({ isActive, category, onClick }: Props) => {
  return (
    <Root isActive={isActive} title={category.title} onClick={onClick}>
      {category.label}
    </Root>
  );
};

export default Tab;

const Root = styled.div<{ isActive: boolean }>`
  padding: 5px;
  flex: 1;
  text-align: center;
  font-size: 1.5em;
  border-bottom: ${props => (props.isActive ? "3px solid cadetblue" : "")};
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;
