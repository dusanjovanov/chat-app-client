import React, { ChangeEvent } from "react";
import useField from "./useField";
import { Input, FormControl, Error } from "../styled";

const PasswordField = () => {
  const { value, error, setValue } = useField("password");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  return (
    <FormControl>
      <label htmlFor="password">Password:</label>
      <Input type="password" id="password" value={value} onChange={onChange} />
      <Error>{error}</Error>
    </FormControl>
  );
};

export default PasswordField;
