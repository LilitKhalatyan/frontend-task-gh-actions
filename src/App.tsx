import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TablePage from "./pages/TablePage";
import ModeratorPage from "./pages/ModeratorPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="/moderator" element={<ModeratorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
