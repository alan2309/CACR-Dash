<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 5d8962a022c6c698d8bcc7ea7ea2f59e8982defb
import "../CSS/SignIn.css";
import { Link } from "react-router-dom";
import "animate.css";

<<<<<<< HEAD
function Signin({ Login, error }) {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };
  return (
    <div class="animate__animated animate__slideInUp">
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
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
          <Link to={`/admin/programs/`}>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
          </Link>
        </form>
      </main>
    </div>
=======
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
>>>>>>> 5d8962a022c6c698d8bcc7ea7ea2f59e8982defb
  );
}

export default Signin;
