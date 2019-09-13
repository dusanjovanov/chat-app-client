import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actionCreators";
import EmailField from "../form/EmailField";
import Form from "../form/Form";
import PasswordField from "../form/PasswordField";
import SubmitButton from "../form/SubmitButton";
import { isEmail } from "../form/validation";
import { Link } from "@reach/router";

const LoginForm = () => {
  const dispatch = useDispatch();
  const onSubmit = ({ email, password }) => dispatch(login(email, password));

  return (
    <Form
      initValues={{ email: "", password: "" }}
      validation={validationRules}
      onSubmit={onSubmit}
    >
      <form>
        <EmailField />
        <PasswordField />
        <div style={{ display: "flex", alignItems: "center" }}>
          <SubmitButton />
          <Link to="/register" style={{ marginLeft: "auto" }}>
            Don't have an account? Register.
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;

const validationRules = {
  email: [
    { type: "required", errorText: "This field is required." },
    { type: "custom", fn: isEmail, errorText: "Wrong format." }
  ],
  password: [{ type: "required", errorText: "This field is required." }]
};
