import { useHabit } from "./UseContextProvider/HabitContext";
import Habit from "./habit";
import "./HabitPage.css";


const HabitPage = () => {
  const {
    habitName,
    setHabitName,
    habitPriority,
    setHabitPriority,
    data,
    sortHabitsByPriorityHigh,
    sortHabitsByPriorityLow,
    sortByRepetitionsHighToLow,
    sortByRepetitionsLowToHigh,
    handleSubmit,
    updateRepetition,
    handleDeleteHabit,
  } = useHabit();

  
  return (
    <div className="habit-container">
      <div className="habit-sort-buttons">
        <button onClick={sortHabitsByPriorityHigh}>Highest Priority</button>
        <button onClick={sortHabitsByPriorityLow}>Lowest Priority</button>
        <button onClick={sortByRepetitionsHighToLow}>Repetitions: High to Low</button>
        <button onClick={sortByRepetitionsLowToHigh}>Repetitions: Low to High</button>
      </div>

      <div className="habit-grid">
        {data.habits.map((habit) => (
          <Habit
            key={habit.id}
            habit={habit}
            handleUpdateRepetition={updateRepetition}
            handleDeleteHabit={handleDeleteHabit}
          />
        ))}
      </div>

      <form className="habit-form" onSubmit={handleSubmit}>
        <input
          value={habitName}
          placeholder="Habit name"
          onChange={(e) => setHabitName(e.target.value)}
        />
        <select
          value={habitPriority}
          onChange={(e) => setHabitPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default HabitPage;