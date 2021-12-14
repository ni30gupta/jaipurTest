import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserAuth from "./UserAuth";

function App() {
  return (
    <div className="container p-2">
      <Router>
        <Routes>
          <Route path="/" element={<UserAuth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
