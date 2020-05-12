import React from "react";
import Timer from "./Components/Timer/Timer.jsx";
import ReactGA from "react-ga";
import "./App.css";

function initializeReactGA() {
  ReactGA.initialize("UA-165720418-1");
  ReactGA.pageview("/homepage");
}
initializeReactGA();
function App() {
  return (
    <div className="App">
      <Timer />
    </div>
  );
}

export default App;
