import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useReducer,
  useState,
  useRef
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { sendMessage } from "../../../redux/actionCreators";
import EmojiPicker from "../../emoji-picker/EmojiPicker";
import useOutsideClick from "../../../hooks/useOutsideClick";
import CharLeft from "./CharLeft";

const maxMessageLength = 200;

const InputArea = () => {
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const refEmojiPicker = useRef();
  useOutsideClick(
    refEmojiPicker.current,
    () => {
      if (isPickerVisible) {
        setPickerVisibility(false);
      }
    },
    "oc-emoji-picker"
  );

  const [value, dispatchValue] = useReducer((value, action) => {
    if (action.type === "pick_emoji") {
      return value + action.payload;
    }
    if (action.type === "update_value") {
      return action.payload;
    }
    return value;
  }, "");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    dispatchValue({ type: "update_value", payload: value });
  };

  const submitMessage = () => {
    const trimmedValue = value.trim();

    if (trimmedValue === "") return;

    if (trimmedValue.length > maxMessageLength) return;

    dispatch(sendMessage(trimmedValue));
    dispatchValue({ type: "update_value", payload: "" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const onClickSend = () => submitMessage();

  const onPickEmoji = useCallback(
    (emoji: string) => {
      dispatchValue({
        type: "pick_emoji",
        payload: emoji
      });
    },
    [dispatch]
  );

  const onClickEmojiButton = () => setPickerVisibility(!isPickerVisible);

  return (
    <Root>
      <EmojiPicker
        onPick={onPickEmoji}
        isVisible={isPickerVisible}
        style={{ width: "100%" }}
        ref={refEmojiPicker}
      />
      <InputContainer>
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Write something..."
          className="oc-emoji-picker"
        />
        <SendButton onClick={onClickSend} title="Send message">
          ✉️
        </SendButton>
      </InputContainer>
      <BottomContainer>
        <EmojiButton
          isActive={isPickerVisible}
          onClick={onClickEmojiButton}
          title="Emoji Picker"
          className="oc-emoji-picker"
        >
          🙂
        </EmojiButton>
        {value.length >= 10 && (
          <CharLeft nCharLeft={maxMessageLength - value.length} />
        )}
      </BottomContainer>
    </Root>
  );
};

export default InputArea;

const Root = styled.div`
  position: relative;
  flex-shrink: 0;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 1em;
  resize: none;
  border: 1px solid #5a5a5a;
  border-radius: 10px;
  &:focus {
    outline: 0;
    border-color: cadetblue;
  }
`;

const SendButton = styled.button`
  font-size: 2.5em;
  margin-left: 30px;
  padding: 5px 10px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  user-select: none;
  &:hover {
    background: #ddd;
    cursor: pointer;
  }
  @media (max-height: 600px) {
    font-size: 1.5em;
    padding: 3px 7px;
  }
  @media (max-width: 450px) {
    font-size: 2em;
    padding: 3px 7px;
    margin-left: 5px;
  }
  &:focus {
    outline: 0;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EmojiButton = styled.button<{ isActive: boolean }>`
  padding: 5px;
  font-size: 1.5em;
  background-color: ${props => (props.isActive ? "#ddd" : "white")};
  border: 0;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  &:focus {
    outline: 0;
  }
`;
