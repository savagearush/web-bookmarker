import React, { Component } from "react";
import { pick } from "lodash";
import Alert from "./alert";

class Form extends Component {
  state = {
    data: {},
    status: {},
    isLoggedIn: false,
    user: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const status = { ...this.state.status };

    if (name === "login-form") {
      const data = pick(this.state.data, ["email", "password"]);
      const errors = this.validate(data);

      if (!errors) {
        this.doSubmit(data);
        return;
      }

      status.type = "danger";
      status.message = errors;
      this.setState({ status });
    }

    if (name === "signup-form") {
      const data = pick(this.state.data, [
        "fullname",
        "username",
        "email",
        "password",
      ]);

      const errors = this.validate(data);
      if (!errors) {
        this.doSubmit(data, e.target);
        return;
      }
      status.type = "warning";
      status.message = errors;
      this.setState({ status });
    }

    if (name === "bookmark-form") {
      const data = pick(this.state.data, ["webName", "webUrl"]);

      const errors = this.validate(data);

      if (!errors) {
        this.doSubmit(data, e.target);
        return;
      }
      status.type = "warning";
      status.message = errors;
      this.setState({ status });
    }

    if (name === "reset-password-form") {
      const email = pick(this.state.data, ["email"]);
      this.doSubmit(email);
    }

    if (name === "change-password-form") {
      const { new_password } = this.state.data;
      if (new_password !== null) {
        this.changePassword(new_password);
        return;
      }
      status.type = "danger";
      status.message = "Enter the password";
      this.setState({ status });
    }
  };

  validate = (data) => {
    const { error } = this.schema.validate(data);
    if (error) return error.details[0].message;
    else return;
  };

  onInputChange = ({ target: input }) => {
    // State Data are assigned here by Input ID
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  // Web-Bookmarker Components
  renderAlert = ({ type, message }) => {
    return <Alert type={type} message={message} />;
  };

  renderInput = ({ type, label, id }) => {
    return (
      <div className="mb-3">
        <label htmlFor={type}>{label}</label>
        <input
          type={type}
          className="form-control"
          onChange={this.onInputChange}
          id={id}
          name={id}
          required
        />
      </div>
    );
  };

  renderButton = ({ type, label, id }) => {
    return (
      <button className="btn btn-primary" type={type} name={label} id={id}>
        {label}
      </button>
    );
  };

  renderModal = () => {
    const { webName, webUrl } = this.state.currentModal;
    return (
      <div
        className="modal fade"
        id="editBookmarkModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Bookmark Link
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group flex-nowrap">
                <span className="input-group-text">Name :</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Website Name"
                  name="webName"
                  value={webName}
                  onChange={({ currentTarget }) =>
                    this.handleChange(currentTarget)
                  }
                />
              </div>
              <div className="input-group flex-nowrap my-2">
                <span className="input-group-text">Link :</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Website Url"
                  value={webUrl}
                  name="webUrl"
                  onChange={({ currentTarget }) =>
                    this.handleChange(currentTarget)
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.saveEdit();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Form;
