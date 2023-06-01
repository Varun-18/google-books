import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookDetail } from "../components/BookDetail";
import { Home } from "../components/Home";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  )
};

export default MainRoutes