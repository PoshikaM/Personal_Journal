import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AddEntry from "./Components/AddEntry";
import NavBar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <NavBar />
        <div className="px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEntry />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;