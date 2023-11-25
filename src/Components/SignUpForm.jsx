import React from "react";
import Form from "./common/form";
import axios from "axios";
import Joi from "joi-browser";
// const API_URL = "http://localhost:5000/";
const API_URL = "https://spontaneous-crostata-01dea9.netlify.app/";

class SignUpForm extends Form {
  schema = Joi.object({
    fullname: Joi.string().min(5).max(50).required(),
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  // Submit Data to the Servers
  doSubmit = async (data, form) => {
    const status = { ...this.state.status };

    try {
      // automatically check for Success Response 2xx
      const response = await axios.post(API_URL + "users/register", data);
      form.reset();
      localStorage.setItem("token", response.headers["x-auth-token"]);
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
      this.setState({ isLoggedIn: true });
      window.location = "/";
    } catch ({ response }) {
      // automatically check for Bad Response 4xx or 5xx
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
    }
  };

  render() {
    const { status } = this.state;
    const style = { maxWidth: "500px", margin: "auto", textAlign: "center" };
    return (
      <div className="container my-5">
        <form
          className="bg-light pt-5 px-5"
          name="signup-form"
          style={style}
          onSubmit={this.handleSubmit}
        >
          <h1 class="h3 mb-3 fw-normal mb-5">Register New Account </h1>

          {this.renderInput({
            type: "text",
            label: "Full Name",
            id: "fullname",
          })}
          {this.renderInput({
            type: "email",
            label: "Email ID",
            id: "email",
          })}
          {this.renderInput({
            type: "text",
            label: "Username",
            id: "username",
          })}
          {this.renderInput({
            type: "password",
            label: "Password",
            id: "password",
          })}
          {this.renderButton({
            type: "submit",
            label: "Sign Up",
            id: "signup-btn",
          })}
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

export default SignUpForm;
