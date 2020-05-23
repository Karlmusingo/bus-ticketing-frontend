import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import initSocketIOClient from "./socketIO";

function App() {
  const [text, setText] = useState("Hello from Bus Ticketing App");

  initSocketIOClient();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
