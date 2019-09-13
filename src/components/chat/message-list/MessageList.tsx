import React, {
  UIEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchMessages } from "../../../redux/actionCreators";
import { useSelector } from "../../../redux/hooks";
import {
  getAreMessagesInitFetched,
  getMessageBlocks
} from "../../../redux/selectors";
import MessageTimeBlock from "./MessageTimeBlock";

const MessageList = () => {
  const messageBlocks = useSelector(getMessageBlocks);
  const areMessagesInitFetched = useSelector(getAreMessagesInitFetched);
  const dispatch = useDispatch();
  const refRoot = useRef<HTMLDivElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  // scroll to bottom of chat initially
  useLayoutEffect(() => {
    refRoot.current.scrollTo(
      0,
      refContainer.current.getBoundingClientRect().height
    );
  }, [areMessagesInitFetched]);

  // if there isn't enough messages to fill the chat space,
  // try to fetch more
  useEffect(() => {
    if (areMessagesInitFetched && refRoot.current.scrollTop === 0) {
      dispatch(fetchMessages());
    }
  }, [messageBlocks, areMessagesInitFetched]);

  // when new messages come in, scroll in the amount of the new messages height
  useLayoutEffect(() => {
    const newHeight = refContainer.current.getBoundingClientRect().height;

    if (newHeight > containerHeight) {
      refRoot.current.scrollBy(0, newHeight - containerHeight);
    }

    setContainerHeight(newHeight);
  }, [messageBlocks]);

  // track the scroll and fetch older messages when it comes to the top
  const onScroll = (e: UIEvent) => {
    const scrollTop = e.currentTarget.scrollTop;

    if (scrollTop === 0) {
      dispatch(fetchMessages());
    }
  };

  return (
    <Root ref={refRoot} onScroll={onScroll}>
      <div ref={refContainer}>
        {messageBlocks.map((tb, idx) => (
          <MessageTimeBlock key={idx} timeBlock={tb} />
        ))}
      </div>
    </Root>
  );
};

export default MessageList;

const Root = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  flex-grow: 1;
  overflow-y: scroll;
  margin-bottom: 20px;
`;
