import moment from "moment";
import React from "react";
import styled from "styled-components";
import { Message } from "../../../types";
import MessageUserBlock from "./MessageUserBlock";

type Props = {
  timeBlock: Message[][];
};

const MessageTimeBlock = ({ timeBlock }: Props) => {
  return (
    <>
      <Time>{moment(timeBlock[0][0].sentAt).format("MMM D, YYYY")}</Time>
      {timeBlock.map((ub, idx) => (
        <MessageUserBlock key={idx} userBlock={ub} />
      ))}
    </>
  );
};

export default MessageTimeBlock;

const Time = styled.div`
  margin: 15px 0;
  text-align: center;
  font-weight: 600;
`;
