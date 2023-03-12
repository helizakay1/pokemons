import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import DetailsPage from "./DetailsPage";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/:id" element={<DetailsPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
