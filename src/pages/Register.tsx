import React from "react";
import { RouteComponentProps, Link } from "@reach/router";

const RegisterPage = (props: RouteComponentProps) => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
      >
        <h2 style={{ fontSize: "2em", marginBottom: 20 }}>
          🚧 This page is a work in progress
        </h2>
        <Link to="/"> Back to login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
