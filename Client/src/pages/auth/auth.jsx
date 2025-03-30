import React, { useState } from "react";
import AuthForm from "../../components/authForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <p>{isLogin ? "Already have an account?" : "Don't have an account?"}</p>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create one" : "Login"}
        </button>
      </div>
      <div className="auth-right">
        <AuthForm isLogin={isLogin} />
      </div>
    </div>
  );
};

export default AuthPage;
