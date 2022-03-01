import "./App.css";
import { Routes, Route } from "react-router-dom";
import Apl from "./components/app/App";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Apl />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
