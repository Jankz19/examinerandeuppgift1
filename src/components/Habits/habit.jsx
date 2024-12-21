import { useHabit } from "./UseContextProvider/HabitContext";
import "./habit.css";

const Habit = ({ habit }) => {
  const { updateRepetition, handleDeleteHabit } = useHabit();

  return (
    <div className="habit-row">
      <div>
        <h1>{habit.task}</h1>
        <p>
          Priority: {habit.priority} | Repetitions: {habit.repetition}
        </p>
      </div>
      <div className="habit-actions">
        <button onClick={() => updateRepetition(habit.id, habit.repetition + 1)}>+</button>
        <button onClick={() => updateRepetition(habit.id, habit.repetition - 1)}>-</button>
        <button onClick={() => updateRepetition(habit.id, 0)}>Reset</button>
        <button onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Habit;