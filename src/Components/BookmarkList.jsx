import React from "react";
import axios from "axios";
import form from "./common/form";
import { toast, ToastContainer } from "react-toastify";
const API_URL = "https://gorgeous-biscuit-16325b.netlify.app/";
// const API_URL = "http://localhost:5000/";

class BookmarkList extends form {
  state = {
    data: null,
    currentModal: { _id: "", webName: "", webUrl: "" },
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL + "bookmark/list", {
      headers: { "x-auth-token": token },
    });
    const data = response.data;
    this.setState({ data });
  };

  handleLink = (item) => {
    window.open(item.webUrl, "_blank");
  };

  handleDelete = async ({ _id }) => {
    let data = [...this.state.data];
    data = data.filter((ele) => ele._id !== _id);
    this.setState({ data });

    try {
      const response = await axios.delete(API_URL + "bookmark/delete/" + _id);
      toast.success(response.data.message);
    } catch ({ response }) {
      toast.error(response.data.message);
    }
  };

  handleEdit = (item) => {
    const currentModal = item;
    this.setState({ currentModal });
  };

  handleChange = ({ name, value }) => {
    const currentModal = { ...this.state.currentModal };
    currentModal[name] = value;
    this.setState({ currentModal });
  };

  saveEdit = async () => {
    const { currentModal } = this.state;

    try {
      await axios.put(
        API_URL + "bookmark/update/" + currentModal._id,
        currentModal
      );
      window.location.reload();
    } catch ({ response }) {
      console.log(response);
      toast.error(response.data.message);
    }
  };

  render() {
    let count = 1;
    return (
      <div className="container" style={{ maxWidth: "1000px" }}>
        <h2 className="fw-medium text-center my-5">Website List</h2>
        {this.state.currentModal && this.renderModal()}
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Website Name</th>
              <th scope="col">Links</th>
              <th scope="col">Edit</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data &&
              this.state.data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{count++}</td>
                    <td>{item.webName}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#26de81",
                          color: "white",
                          fontSize: "16px",
                        }}
                        onClick={() => this.handleLink(item)}
                      >
                        Open
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#editBookmarkModal"
                        className="btn btn-sm btn-warning text-white"
                        onClick={() => this.handleEdit(item)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        style={{
                          backgroundColor: "#fc5c65",
                          color: "white",
                          fontSize: "16px",
                        }}
                        onClick={() => this.handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    );
  }
}

export default BookmarkList;
