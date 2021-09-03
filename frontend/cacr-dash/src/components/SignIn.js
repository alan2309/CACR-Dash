import React, { useState, useEffect } from "react";
import "../CSS/SignIn.css";
import { Link } from "react-router-dom";

function Signin({ Login, error, history }) {
  const [details, setDetails] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/admin/programs/");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
    history.push("/admin/programs/");
  };
  return (
    <main className="form-signin">
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Admin Log in</h1>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email Address"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          value={details.email}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}

export default Signin;
