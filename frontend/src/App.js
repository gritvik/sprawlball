import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Insert from "./pages/Insert/Insert";
import Shots from "./pages/Shots/Shots";
import Login from "./pages/Login/Login";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/shots" element={<Shots />} />
            <Route path="/account" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
