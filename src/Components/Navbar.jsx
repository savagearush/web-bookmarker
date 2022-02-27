import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import form from "./common/form";
import jwt_decode from "jwt-decode";

class Navbar extends form {
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isLoggedIn: true });
      const user = jwt_decode(token);
      this.setState({ user });
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ isLoggedIn: false });
    window.location = "/";
  };

  renderBeforeLoggedIn = () => {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            {}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            SignUp
          </Link>
        </li>
      </ul>
    );
  };

  renderAfterLoggedIn = () => {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/bookmarklist">
            Bookmark List
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={() => this.handleLogout()}>
            Logout
          </Link>
        </li>
        <li className="nav-item">
          <Link className="h4 badge lead nav-link " to="/">
            Logged as ! {this.state.user.name}
          </Link>
        </li>
      </ul>
    );
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-dark fw-light h4"
          style={{ backgroundColor: "#1e3799" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="Website Logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse text-center"
              id="navbarNav"
            >
              {isLoggedIn
                ? this.renderAfterLoggedIn()
                : this.renderBeforeLoggedIn()}
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default Navbar;
