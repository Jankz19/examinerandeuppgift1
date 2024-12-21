import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const HabitContext = createContext();


export const useHabit = () => {
  return useContext(HabitContext);
};

export const HabitProvider = ({ children }) => {
  const [habitName, setHabitName] = useState("");
  const [habitPriority, setHabitPriority] = useState("");
  const [data, setData] = useState({ habits: [] });

  const priorities = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const sortHabitsByPriorityHigh = () => {
    setData((prevData) => ({
      ...prevData,
      habits: [...prevData.habits].sort((a, b) => priorities[b.priority] - priorities[a.priority]
      ),
    }));
  };

  const sortHabitsByPriorityLow = () => {
    setData((prevData) => ({
      ...prevData,
      habits: [...prevData.habits].sort((a, b) => priorities[a.priority] - priorities[b.priority]
      ),
    }));
  };

  const sortByRepetitionsHighToLow = () => {
    setData((prevData) => ({
      ...prevData,
      habits: [...prevData.habits].sort((a, b) => b.repetition - a.repetition),
    }));
  };

  const sortByRepetitionsLowToHigh = () => {
    setData((prevData) => ({
      ...prevData,
      habits: [...prevData.habits].sort((a, b) => a.repetition - b.repetition),
    }));
  };

  const updateRepetition = (id, newRepetition) => {
    let currentIndex = data.habits.findIndex((habit) => habit.id === id);
    let updatedHabits = [...data.habits];
    updatedHabits[currentIndex].repetition = newRepetition;
    setData({ habits: updatedHabits });
  };

  const handleDeleteHabit = (id) => {
    setData((prevData) => ({
      ...prevData,
      habits: prevData.habits.filter((habit) => habit.id !== id),
    }));
  };

  const handleAddHabit = (newHabit) => {
    if (habitPriority !== "") {
      setData((prevData) => ({
        ...prevData,
        habits: [...prevData.habits, newHabit],
      }));
      setHabitPriority("");
    } else {
      alert("Choose priority first");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      id: uuidv4(),
      task: habitName,
      priority: habitPriority,
      repetition: 0,
    };
    handleAddHabit(newHabit);
    setHabitName("");
  };

  const getTopHabits = () => {
    return [...data.habits]
      .sort((a, b) => b.repetition - a.repetition) 
      .slice(0, 3); 
  };

  return (
    <HabitContext.Provider
      value={{
        habitName,
        setHabitName,
        habitPriority,
        setHabitPriority,
        data,
        setData,
        getTopHabits,
        sortHabitsByPriorityHigh,
        sortHabitsByPriorityLow,
        sortByRepetitionsHighToLow,
        sortByRepetitionsLowToHigh,
        updateRepetition,
        handleDeleteHabit,
        handleAddHabit,
        handleSubmit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};