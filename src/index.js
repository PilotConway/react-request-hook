import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Typography from "@material-ui/core/Typography";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Typography variant="h2">Testing RxJS API Calls</Typography>
      <Dashboard />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
