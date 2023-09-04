import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const changeFormHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setLoginMode(!loginMode);
  };

  return (
    <div>
      {loginMode ? (
        <>
          <LoginForm changeFormHandler={changeFormHandle} />
        </>
      ) : (
        <>
          <RegisterForm changeFormHandler={changeFormHandle} />
        </>
      )}
    </div>
  );
};

export default Login;
