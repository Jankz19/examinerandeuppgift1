import { useHabit } from "./UseContextProvider/HabitContext";
import "./App.css";


function App() {
  const  {getTopHabits}  = useHabit(); 

  const topHabits = getTopHabits(); 

  return (
  
    <div className="habit-app-container">
      
      <h2>Top 3 Habits</h2>
      <ul>
        {topHabits.map((habit) => (
          <li key={habit.id}>
            {habit.task} - Repetitions: {habit.repetition}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


