import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import axios from "axios";
// const API_URL = "https://savage-bookmarker-api.herokuapp.com/";
const API_URL = "http://localhost:5000/";
class LoginForm extends Form {
  schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  doSubmit = async (data) => {
    const status = { ...this.state.status };
    try {
      // automatically check for Success Response 2xx
      const response = await axios.post(API_URL + "auth", data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
      this.setState({ isLoggedIn: true });
      window.location = "/";
    } catch ({ response }) {
      // automatically check for bad Response 4xx or 5xx
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
    }
  };

  render() {
    const { status } = this.state;
    const style = {
      maxWidth: "500px",
      margin: "auto",
      textAlign: "center",
    };
    return (
      <div className="container my-5">
        <form
          className="bg-light pt-5 px-5 rounded"
          name="login-form"
          style={style}
          onSubmit={this.handleSubmit}
        >
          <h1 className="h3 mb-3 fw-normal mb-5">Login to your Account</h1>
          {this.renderInput({ type: "email", label: "Email ID", id: "email" })}
          {this.renderInput({
            type: "password",
            label: "Password",
            id: "password",
          })}
          {this.renderButton({
            type: "submit",
            label: "Login",
            id: "login-btn",
          })}
          <div>
            <a href="/reset-password" className="">
              Forgot Password ?
            </a>
          </div>
          <p class="mt-5 mb-3 text-muted">&copy; 2019–2021</p>
          {this.state.status !== ""
            ? this.renderAlert({
                type: status.type,
                message: status.message,
              })
            : ""}
        </form>
      </div>
    );
  }
}

export default LoginForm;
