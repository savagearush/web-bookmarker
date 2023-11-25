import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import axios from "axios";
const API_URL = "https://spontaneous-crostata-01dea9.netlify.app/";
// const API_URL = "http://localhost:5000/";

class BookmarkForm extends Form {
  schema = Joi.object({
    webName: Joi.string().min(2).max(20).trim().required(),
    webUrl: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .min(5)
      .max(100)
      .trim()
      .required(),
  });

  doSubmit = async (data, form) => {
    const status = { ...this.state.status };
    try {
      const response = await axios.get(API_URL + "bookmark/save", {
        params: data,
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      form.reset();
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });

      setTimeout(() => {
        this.setState({ status: {} });
      }, 2000);
    } catch ({ response }) {
      status.type = response.data.type;
      status.message = response.data.message;
      this.setState({ status });
    }
  };

  render() {
    const { status } = this.state;
    return (
      <main className="container mt-5 text-center">
        <div className="p-4 p-md-5 mb-4 text-dark bg-light">
          <form
            style={{ maxWidth: "600px", margin: "auto" }}
            onSubmit={this.handleSubmit}
            name="bookmark-form"
          >
            <h1 className="display-4 fst-italic mb-5 fw-regular">
              Bookmark your Website
            </h1>
            {this.renderInput({
              type: "text",
              label: "Website Name",
              id: "webName",
            })}
            {this.renderInput({
              type: "text",
              label: "Website Url",
              id: "webUrl",
            })}
            {this.renderButton({
              type: "submit",
              label: "Save",
              id: "save-bookmark",
            })}
            {status !== ""
              ? this.renderAlert({
                  type: status.type,
                  message: status.message,
                })
              : ""}
          </form>
        </div>
      </main>
    );
  }
}

export default BookmarkForm;
