import React, { ChangeEvent } from "react";
import useField from "./useField";
import { Input, FormControl, Error } from "../styled";

const EmailField = () => {
  const { value, error, setValue } = useField("email");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return (
    <FormControl>
      <label htmlFor="email">Email:</label>
      <Input type="email" id="email" value={value} onChange={onChange} />
      <Error>{error}</Error>
    </FormControl>
  );
};

export default EmailField;
