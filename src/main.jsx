import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HabitPage from "./components/habitPage";
import Navbar from "./components/Navbar"; 
import ToDoList from "./components/to-do-list";

import { HabitProvider } from "./UseContextProvider/HabitContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HabitProvider>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/habits" element={<HabitPage />} />
          <Route path="/todos" element={<ToDoList/>} />
        </Routes>
      </HabitProvider>
    </BrowserRouter>
  </StrictMode>
);
