import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HabitPage from "./components/habitPage";
import Navbar from "./components/Navbar"; 
import { HabitProvider } from "./UseContextProvider/HabitContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HabitProvider>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/habits" element={<HabitPage />} />
        </Routes>
      </HabitProvider>
    </BrowserRouter>
  </StrictMode>
);
