import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


// Komponenten för att skriva en uppgift
function RedigeraUppgift({ todos, setTodos }) {
 // Hämtar uppgiftens ID och navigeringen 
 const { id } = useParams();
 const navigate = useNavigate();


 // Hitta uppgiften med id
 const uppgift = todos.find((todo) => todo.id === parseInt(id)) || {};


 // state som hanterar formuläret 
 const [form, setForm] = useState({
   title: "",
   description: "",
   category: "",
   deadline: "",
   estimate: "",
   status: "",
 });


 // Fyll formuläret med nuvarande data
 useEffect(() => {
   if (uppgift) setForm(uppgift);
 }, [uppgift]);


 // Nytt formulär när man ändrar
 const uppdateraForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });


 // Sparar uppdateringar och gå tillbaka till startsidan
 const sparaUppgift = () => {
   setTodos((prev) =>
     prev.map((todo) => (todo.id === uppgift.id ? { ...form, id: todo.id } : todo))
   );
   localStorage.setItem("todos", JSON.stringify(todos)); // Sparar för local o uppdaterar
   navigate("/");
 };


 // Tar bort en uppgift och gå tillbaka till startsidan
 const taBortUppgift = () => {
   setTodos((prev) => prev.filter((todo) => todo.id !== uppgift.id));
   localStorage.setItem("todos", JSON.stringify(todos)); // Sparar för local o uppdaterar
   navigate("/");
 };


 return (
   <div className="container">
     <h2>Redigera Uppgift</h2>
     <form>
       {/* Fixa titeln */}
       <input name="title" value={form.title} onChange={uppdateraForm} placeholder="Titel" />
       {/* Fixa beskrvningen */}
       <textarea
         name="description"
         value={form.description}
         onChange={uppdateraForm}
         placeholder="Beskrivning"
       />
       {/* Fixar deadline */}
       <input type="date" name="deadline" value={form.deadline} onChange={uppdateraForm} />
       {/* DROPDOWN för tiden */}
       <select name="estimate" value={form.estimate} onChange={uppdateraForm}>
         {["", 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((val, i) => (
           <option key={i} value={val}>
             {val ? `${val * 60} min` : "Välj tidsestimat"}
           </option>
         ))}
       </select>
       {/* DROPDOWN för kategori */}
       <select name="category" value={form.category} onChange={uppdateraForm}>
         {["Hushåll", "Jobbrelaterat", "Nöje", "Hälsa"].map((val, i) => (
           <option key={i} value={val}>
             {val}
           </option>
         ))}
       </select>
       {/* DROPDOWN för statusen */}
       <select name="status" value={form.status} onChange={uppdateraForm}>
         {["Ej påbörjad", "Pågående", "Klar"].map((val, i) => (
           <option key={i} value={val}>
             {val}
           </option>
         ))}
       </select>
       {/* Knapparna för spara o ta bort */}
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