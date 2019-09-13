import React from "react";
import styled from "styled-components";

type Props = { nCharLeft: number };

const CharLeft = ({ nCharLeft }: Props) => {
  return (
    <Root isDanger={nCharLeft < 0}>
      {nCharLeft >= 0
        ? `${nCharLeft} characters left.`
        : "Max. num. of characters exceeded."}
    </Root>
  );
};

export default CharLeft;

const Root = styled.div<{ isDanger: boolean }>`
  margin-left: auto;
  margin-right: 140px;
  color: ${props => (props.isDanger ? "red" : "black")};
`;
