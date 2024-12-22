import React from "react";
import { Routes, Route } from "react-router-dom";
import RedigeraUppgift from "./edit-to-do";
import Uppgift from "./to-do";
import "./to-do-list.css";

// Skapar en funktion som heter "AttGöraLista" för att hantera listan
function AttGöraLista({ todos, setTodos }) {
    // Sparar data för formuläret som används för att lägga till nya uppgifter
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    estimate: "",
    deadline: "",
    category: "Hushåll",
    status: "Ej påbörjad",
  });
  
  // Spara data för filtreringen
  const [filter, setFilter] = React.useState({
    status: "",
    category: "",
    sort: "",
  });

  // Funktion som lägger till ny uppgift i listan
  const läggTillUppgift = () => {
    if (!form.title.trim()) return;
    const nyUppgift = { ...form, id: Date.now() };
    const nyaUppgifter = [...todos, nyUppgift];
    setTodos(nyaUppgifter);
    localStorage.setItem("uppgifter", JSON.stringify(nyaUppgifter));
    // Återställ formuläret
    setForm({ title: "", description: "", estimate: "", deadline: "", category: "Hushåll", status: "Ej påbörjad" });
  };

  // Filtrera uppgifter om vad man själv valt i filtering
  const filtreradeUppgifter = todos.filter(
    (uppgift) =>
      (!filter.status || uppgift.status === filter.status) &&
      (!filter.category || uppgift.category === filter.category)
  );

    // Sortera uppgifter gällande vad man valt i sorteringen
  const sorteradeUppgifter = filtreradeUppgifter.sort((a, b) => {
    if (filter.sort === "deadlineAsc") return new Date(a.deadline) - new Date(b.deadline);
    if (filter.sort === "deadlineDesc") return new Date(b.deadline) - new Date(a.deadline);
    if (filter.sort === "estimateAsc") return parseFloat(a.estimate) - parseFloat(b.estimate);
    if (filter.sort === "estimateDesc") return parseFloat(b.estimate) - parseFloat(a.estimate);
    if (filter.sort === "statusAsc")
      return ["Ej påbörjad", "Pågående", "Klar"].indexOf(a.status) -
             ["Ej påbörjad", "Pågående", "Klar"].indexOf(b.status); // Status ordning
    if (filter.sort === "statusDesc")
      return ["Klar", "Pågående", "Ej påbörjad"].indexOf(a.status) -
             ["Klar", "Pågående", "Ej påbörjad"].indexOf(b.status); // status omvänd ordning
    return 0;
  });

 // Uppdatera form när man skriver skriver i den
  const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  // Uppdatera form när man ändrar i den i filtreringsfält
  const updateFilter = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });

  // Skriv ut allt renderar
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container">
            <h2>Glöm Inte Att Göra Listan</h2>
            <form>
              <input name="title" value={form.title} onChange={updateForm} placeholder="Titel" />
              <textarea name="description" value={form.description} onChange={updateForm} placeholder="Beskrivning" />
              <select name="estimate" value={form.estimate} onChange={updateForm}>
                <option value="">Välj tidsestimat</option>
                {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((val) => (
                  <option key={val} value={val}>
                    {val} tim
                  </option>
                ))}
              </select>
              <input type="date" name="deadline" value={form.deadline} onChange={updateForm} />
              <select name="category" value={form.category} onChange={updateForm}>
                {["Hushåll", "Jobbrelaterat", "Nöje", "Hälsa"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select name="status" value={form.status} onChange={updateForm}>
                {["Ej påbörjad", "Pågående", "Klar"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <button type="button" onClick={läggTillUppgift}>
                Lägg till
              </button>
            </form>

            <div className="filter-row">
              <select name="status" value={filter.status} onChange={updateFilter}>
                <option value="">Visa alla statusar</option>
                {["Ej påbörjad", "Pågående", "Klar"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select name="category" value={filter.category} onChange={updateFilter}>
                <option value="">Alla kategorier</option>
                {["Hushåll", "Jobbrelaterat", "Nöje", "Hälsa"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select name="sort" value={filter.sort} onChange={updateFilter}>
                <option value="">Sortera</option>
                <option value="deadlineAsc">Deadline stigande</option>
                <option value="deadlineDesc">Deadline fallande</option>
                <option value="estimateAsc">Tidsestimat stigande</option>
                <option value="estimateDesc">Tidsestimat fallande</option>
                <option value="statusAsc">Status stigande</option>
                <option value="statusDesc">Status fallande</option>
              </select>
            </div>

            <ul className="list">
              {sorteradeUppgifter.map((uppgift) => (
                <li key={uppgift.id}>
                  <Uppgift uppgift={uppgift} />
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <Route path="/task/:id" element={<RedigeraUppgift todos={todos} setTodos={setTodos} />} />
    </Routes>
  );
}

export default AttGöraLista;