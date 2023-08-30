import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [loginMode, setLoginMode] = useState<boolean>(true);

  return (
    <div>
      {loginMode ? (
        <>
          <LoginForm />
        </>
      ) : (
        <>
          <RegisterForm />
        </>
      )}
    </div>
  );
};

export default Login;
