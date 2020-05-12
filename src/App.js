import React from "react";
import Timer from "./Components/Timer/Timer.jsx";
import ReactGA from "react-ga";
import "./App.css";
ReactGA.initialize("UA-165720418-1");

function App() {
  return (
    <div className="App">
      <Timer />
    </div>
  );
}

export default App;
