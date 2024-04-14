import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TablePage from "./pages/TablePage";
import ModeratorPage from "./pages/ModeratorPage";

// require('dotenv').config();

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="/moderator" element={<ModeratorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
