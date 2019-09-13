import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormControl = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const HorizontalFormControl = styled(FormControl)`
  display: flex;
  align-items: center;
`;

export const Error = styled.div`
  color: #e83212;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: cadetblue;
  color: white;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #77b5b7;
  }
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 2.5em;
  font-weight: normal;
  margin-bottom: 40px;
`;

export const Container = styled.div`
  width: 25%;
  margin: 0 auto;
  padding: 1em;
  @media (max-width: 1600px) {
    width: 35%;
  }
  @media (max-width: 1000px) {
    width: 45%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const EmojiButton = styled.button<{ isActive: boolean }>`
  position: relative;
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

export const Spinner = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 10px solid #ddd;
  border-radius: 50%;
  border-top-color: cadetblue;
  border-right-color: cadetblue;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
