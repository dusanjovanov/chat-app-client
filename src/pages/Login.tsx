import { RouteComponentProps } from "@reach/router";
import React from "react";
import LoginForm from "../components/login/LoginForm";
import { Container, Heading, Error } from "../components/styled";
import { useSelector } from "../redux/hooks";

const LoginPage = (props: RouteComponentProps) => {
  const loginError = useSelector(state => state.loginError);

  return (
    <>
      <Container>
        <Heading>Chat 💬</Heading>
        {loginError.length > 0 && (
          <Error style={{ marginBottom: 10, textAlign: "center" }}>
            {loginError}
          </Error>
        )}
        <LoginForm />
        <div style={{ marginTop: 10 }}>
          <div>Guest account </div>
          <div>
            Email: <strong>guest@guest.com</strong>
          </div>
          <div>
            Password: <strong>guest</strong>{" "}
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
