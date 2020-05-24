import React from "react";
import "./App.scss";
import App from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Container() {
  return (
    <>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="App">
        <App />
      </div>
    </>
  );
}

export default Container;
