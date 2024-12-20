import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RedigeraUppgift from "./edit-to-do";
import Uppgift from "./to-do";
import "./to-do-list.css";


// komponent som fixar listan av uppgifter
function AttGöraLista() {
 const [uppgifter, setUppgifter] = useState([]);
 const [form, setForm] = useState({
   title: "",
   description: "",
   estimate: "",
   deadline: "",
   category: "Hushåll",
   status: "Ej påbörjad",
 });


 const [filter, setFilter] = useState({
   status: "",
   category: "",
   specificStatus: "",
   sort: "",
 });


 // Hittar uppgifter från local
 useEffect(() => {
   const sparadeUppgifter = localStorage.getItem("uppgifter");
   if (sparadeUppgifter) setUppgifter(JSON.parse(sparadeUppgifter));
 }, []);


 // Lägger till en ny uppgift och sparar till local
 const läggTillUppgift = () => {
   if (!form.title.trim()) return;
   const nyUppgift = { ...form, id: Date.now() };
   const nyaUppgifter = [...uppgifter, nyUppgift];
   setUppgifter(nyaUppgifter);
   localStorage.setItem("uppgifter", JSON.stringify(nyaUppgifter));
   setForm({ title: "", description: "", estimate: "", deadline: "", category: "Hushåll", status: "Ej påbörjad" });
 };


 // Filtrerar uppgifter baserat på det man väljer
 const filtreradeUppgifter = uppgifter.filter(
   (uppgift) =>
     (!filter.status || uppgift.status === filter.status) &&
     (!filter.category || uppgift.category === filter.category) &&
     (!filter.specificStatus || uppgift.status === filter.specificStatus)
 );


 // Sorterar de filtrerade uppgifterna baserat på vad man väljer
 const sorteradeUppgifter = filtreradeUppgifter.sort((a, b) => {
   if (filter.sort === "deadlineAsc") return new Date(a.deadline) - new Date(b.deadline);
   if (filter.sort === "deadlineDesc") return new Date(b.deadline) - new Date(a.deadline);
   if (filter.sort === "estimateAsc") return parseFloat(a.estimate) - parseFloat(b.estimate);
   if (filter.sort === "estimateDesc") return parseFloat(b.estimate) - parseFloat(a.estimate);
   if (filter.sort === "statusAsc")
     return ["Ej påbörjad", "Pågående", "Klar"].indexOf(a.status) -
            ["Ej påbörjad", "Pågående", "Klar"].indexOf(b.status);
   if (filter.sort === "statusDesc")
     return ["Klar", "Pågående", "Ej påbörjad"].indexOf(a.status) -
            ["Klar", "Pågående", "Ej påbörjad"].indexOf(b.status);
   return 0;
 });


 const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });


 const updateFilter = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });


 return (
 <div className="container">
             <h2>Glöm Inte Att Göra Listan</h2>
             <form>
               <input name="title" value={form.title} onChange={updateForm} placeholder="Titel" />
               <textarea name="description" value={form.description} onChange={updateForm} placeholder="Beskrivning" />
               <select name="estimate" value={form.estimate} onChange={updateForm}>
                 <option value="">Tiden för att utföra</option>
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
               <select name="specificStatus" value={filter.specificStatus} onChange={updateFilter}>
                 <option value="">Välj status att visa</option>
                 {["Ej påbörjad", "Pågående", "Klar"].map((val) => (
                   <option key={val} value={val}>
                     {val}
                   </option>
                 ))}
               </select>
               <select name="sort" value={filter.sort} onChange={updateFilter}>
                 <option value="">Sortera</option>
                 <option value="deadlineAsc">Närmaste Deadline Först</option>
                 <option value="deadlineDesc">Senaste Deadline Först</option>
                 <option value="estimateAsc">Från Tidig Till Sen</option>
                 <option value="estimateDesc">Från Sen Till Tidig</option>
                 <option value="statusAsc">Från Påbörjad Till Slutförd </option>
                 <option value="statusDesc">Från Slutförd Till Påbörjad</option>
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
 );
}


export default AttGöraLista;