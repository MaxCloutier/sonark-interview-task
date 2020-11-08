import md5 from "md5";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input, { useFormInput } from "../components/Input";
import axios from "../utils/axios";
import { setToken } from "../utils/common";
import { Button } from "grommet";
import "./login.scss";

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    axios
      .post("users/authenticate", {
        username: username.value,
        password: md5(password.value),
      })
      .then((response) => {
        setLoading(false);
        setToken(response.data.token);
        window.location.href = "/";
      })
      .catch(({ response }) => {
        setLoading(false);
        setError(response.data.message);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Sign In</h1>
      <Input required placeholder="Email" {...username} />

      <Input
        required
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        {...password}
      />

      {error && <p className="error">{error}</p>}
      <Button className="login-btn" type="submit" disabled={loading}>
        Sign In
      </Button>
    </form>
  );
};

export default Login;
