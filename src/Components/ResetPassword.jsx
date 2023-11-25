import React from "react";
import Form from "./common/form";
import axios from "axios";
// const API_URL = "http://localhost:5000/";
const API_URL = "https://spontaneous-crostata-01dea9.netlify.app/";
// check if Reset User Token Defined
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get("token");

export default class ResetPassword extends Form {
  doSubmit = async (email) => {
    const status = { ...this.state.status };
    try {
      const response = await axios.post(API_URL + "resetpassword", email, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
    } catch ({ response }) {
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
    }
  };

  changePassword = async (new_password) => {
    const status = { ...this.state.status };
    const data = { new_password, token };
    try {
      const response = await axios.post(API_URL + "changepassword", data);
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
      setTimeout(() => {
        window.location("/");
      }, 3000);
    } catch ({ response }) {
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

    if (token !== null) {
      return (
        <div className="container my-5">
          <form
            className="bg-light pt-5 px-5 rounded"
            name="change-password-form"
            style={style}
            onSubmit={this.handleSubmit}
          >
            <h1 className="h3 mb-3 fw-normal mb-5">Change your Password</h1>
            {this.renderInput({
              type: "password",
              label: "New Password : ",
              id: "new_password",
            })}

            {this.renderButton({
              type: "submit",
              label: "Reset",
              id: "reset-btn",
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

    return (
      <div className="container my-5">
        <form
          className="bg-light pt-5 px-5 rounded"
          name="reset-password-form"
          style={style}
          onSubmit={this.handleSubmit}
        >
          <h1 className="h3 mb-3 fw-normal mb-5">Reset Password</h1>
          {this.renderInput({
            type: "email",
            label: "Email Address : ",
            id: "email",
          })}

          {this.renderButton({
            type: "submit",
            label: "Reset",
            id: "reset-btn",
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
