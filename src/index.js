import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Components/Home";
import About from "./Components/About";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import NotFound from "./Components/Notfound";
import Dashboard from "./Components/Dashboard";
import BookmarkList from "./Components/BookmarkList";
import ResetPassword from "./Components/ResetPassword";
import "./index.css";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const token = localStorage.getItem("token");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {token && <Route index element={<Dashboard />} />}
          {!token && <Route index element={<Home />} />}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/bookmarklist" element={<BookmarkList />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
