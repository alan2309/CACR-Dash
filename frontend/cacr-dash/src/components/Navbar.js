import React, { useState, useEffect } from "react";
import "../CSS/Navbar.css";
import logo from "../logo.png";
import { Link } from "react-router-dom";

function Navbar({ Logout, isLogged }) {
  return (
    <nav className="navbar navbar-expand-md mb-4">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img
            src={logo}
            alt="logo"
            className="d-inline-block align-middle mr-2"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <Link to="/programs" style={{ textDecoration: "none" }}>
              <li className="nav-item">
                <a className="nav-link">Our Programs</a>
              </li>
            </Link>
            <Link to="/cacr" style={{ textDecoration: "none" }}>
              <li className="nav-item">
                <a className="nav-link">CACR</a>
              </li>
            </Link>
            <Link to="/admin/login" style={{ textDecoration: "none" }}>
              <li className="nav-item">
                <a className="nav-link">Admin</a>
              </li>
            </Link>
          </ul>
        </div>
        {isLogged && (
          <button className="btn btn-lg btn-danger"
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
