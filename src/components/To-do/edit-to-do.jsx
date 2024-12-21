import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedigeraUppgift({ todos, setTodos }) {
  const { id } = useParams(); // Hämta ID från URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Hushåll",
    deadline: "",
    estimate: "",
    status: "Ej påbörjad",
  });

  // Hämta rätt uppgift baserat på ID
  useEffect(() => {
    const uppgift = todos.find((todo) => todo.id === parseInt(id, 10));
    if (uppgift) {
      setForm({ ...uppgift }); // Kopiera data till formuläret
    }
  }, [id, todos]);

  // Hantera formulärändringar
  const uppdateraForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Uppdatera en uppgift
  const sparaUppgift = () => {
    const uppdateradeTodos = todos.map((todo) =>
      todo.id === parseInt(id, 10) ? { ...form, id: todo.id } : todo
    );
    setTodos(uppdateradeTodos); // Uppdatera todos
    localStorage.setItem("uppgifter", JSON.stringify(uppdateradeTodos)); // Spara till localStorage
    navigate("/todos"); // Navigera tillbaka till listan
  };

  // Ta bort en uppgift
  const taBortUppgift = () => {
    const uppdateradeTodos = todos.filter((todo) => todo.id !== parseInt(id, 10));
    setTodos(uppdateradeTodos); // Uppdatera todos
    localStorage.setItem("uppgifter", JSON.stringify(uppdateradeTodos)); // Spara till localStorage
    navigate("/todos"); // Navigera tillbaka till listan
  };

  return (
    <div className="container">
      <h2>Redigera Uppgift</h2>
      <form>
        <input
          name="title"
          value={form.title}
          onChange={uppdateraForm}
          placeholder="Titel"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={uppdateraForm}
          placeholder="Beskrivning"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={uppdateraForm}
        />
        <select name="estimate" value={form.estimate} onChange={uppdateraForm}>
          <option value="">Välj tidsestimat</option>
          {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((val) => (
            <option key={val} value={val}>
              {val} tim
            </option>
          ))}
        </select>
        <select name="category" value={form.category} onChange={uppdateraForm}>
          {["Hushåll", "Jobbrelaterat", "Nöje", "Hälsa"].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <select name="status" value={form.status} onChange={uppdateraForm}>
          {["Ej påbörjad", "Pågående", "Klar"].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <div className="button-group">
          <button type="button" onClick={sparaUppgift}>
            Spara
          </button>
          <button type="button" className="delete-btn" onClick={taBortUppgift}>
            Ta bort
          </button>
        </div>
      </form>
    </div>
  );
}

export default RedigeraUppgift;