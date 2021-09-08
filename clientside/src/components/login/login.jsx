import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const loginHandler = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.error) {
          props.errorHandler({ responseData });
        } else {
          props.userDetailHandler({
            userId: responseData.userId,
            username: responseData.username,
            email: responseData.email,
            imageUrl: responseData.imageUrl,
          });
          history.push("/chat");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <form onSubmit={loginHandler}>
        <h1 className="text-center text-white">LOGIN</h1>
        <div className="form-group my-3">
          <label htmlFor="reg_email" className="text-white">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="reg_email"
            placeholder="Enter email address"
            onChange={emailChangeHandler}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="reg_password" className="text-white">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="reg_password"
            placeholder="Enter Password"
            onChange={passwordChangeHandler}
          />
        </div>
        <div className="mt-3 text-center">
          <button type="submit" className="btn btn-success w-25">
            Login
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
