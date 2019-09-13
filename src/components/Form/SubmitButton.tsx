import React, { useContext, MouseEvent } from "react";
import { FormContext } from "./Form";
import { Button } from "../styled";

const SubmitButton = () => {
  const { onSubmit } = useContext(FormContext);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return <Button onClick={onClick}>Login</Button>;
};

export default SubmitButton;
