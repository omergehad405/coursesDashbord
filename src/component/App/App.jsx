import React from "react";
import "./App.css";
import Menu from "../Menu/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import NewCourse from "../Pages/newCoursePage/NewCourse";
import { CoursesProvider } from "../context/CoursesContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="menu">
          <Menu />
        </div>

        <div className="pages">
          <CoursesProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/newCourse" element={<NewCourse />} />
            </Routes>
          </CoursesProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
