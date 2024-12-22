import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HabitPage from "./components/Habits/habitPage";
import Navbar from "./components/Navbar/Navbar";
import ToDoList from "./components/To-do/to-do-list";
import RedigeraUppgift from "./components/To-do/edit-to-do";
import { HabitProvider } from "./components/Habits/UseContextProvider/HabitContext";


function Main() {
  //State för att hantera todo listan
  const [todos, setTodos] = useState([]);

  return (
    <StrictMode>
      <BrowserRouter>
        <HabitProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/habits" element={<HabitPage />} />
            {/* Skicka todos och setTodos till ToDoList */}
            <Route path="/todos" element={<ToDoList todos={todos} setTodos={setTodos} />} />
            {/* Skicka todos och setTodos till RedigeraUppgift */}
            <Route
              path="/task/:id"
              element={<RedigeraUppgift todos={todos} setTodos={setTodos} />}
            />
          </Routes>
        </HabitProvider>
      </BrowserRouter>
    </StrictMode>
  );
}


createRoot(document.getElementById("root")).render(<Main />);