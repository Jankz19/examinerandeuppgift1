import { useHabit } from "./components/Habits/UseContextProvider/HabitContext";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const { getTopHabits } = useHabit();

  
  const topHabits = getTopHabits();

  // State todo som gör att man sparar listan
  const [todos, setTodos] = useState([]);

  // Hämtar todos från local när man startar 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("uppgifter")) || [];
    setTodos(savedTodos);
  }, []);

  // Hämtar fram de tre senaste todos och sorterar dem
  const latestTodos = todos
    .filter((todo) => todo.status !== "Klar") // De som inte är klara
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) //närmast datum först
    .slice(0, 3); // De 3 första

  // Blir det vi ser på skärmen 
  return (
    <div className="homePagebox">
      <div className="habitsCard">
        <h2>Top 3 Habits</h2>
        <ul>
          {topHabits.map((habit) => (
            <li key={habit.id}>
              {habit.task} - Repetitions: {habit.repetition}
            </li>
          ))}
        </ul>
      </div>

      <div className="todosCard">
        <h2>Top 3 Todos</h2>
        <ul>
          {latestTodos.map((todo) => (
            <li key={todo.id}>
              <p>Titel: {todo.title}</p>
              <p>Deadline: {todo.deadline}</p>
              <p>Status: {todo.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
