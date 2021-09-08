import React, { useState } from "react";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const imageOnChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };
  const registerHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("image", image);
    formData.append("password", password);

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.error) {
          props.errorHandler({ responseData });
        } else {
          props.successHandler({ responseData });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <form onSubmit={registerHandler}>
        <h1 className="text-center text-white">REGISTER</h1>
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
          <small id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="reg_username" className="text-white">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="reg_username"
            onChange={usernameChangeHandler}
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="reg_image" className="text-white">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="reg_image"
            name="image"
            accept="image/*"
            onChange={imageOnChangeHandler}
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
            onChange={passwordChangeHandler}
            placeholder="Enter Password"
          />
        </div>
        <div className="mt-3 text-center">
          <button type="submit" className="btn btn-success w-25">
            Register
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default RegisterForm;
