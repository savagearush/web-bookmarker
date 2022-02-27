import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navbar";

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
