import { Link } from "react-router-dom";


// Komponent som visar en uppgift
function Uppgift({ uppgift }) {
  // Fixar tiden 0.5tim m.m 
  const formatTid = (tidsestimat) =>
    `${Math.floor(tidsestimat)}:${(tidsestimat % 1) * 60 === 0 ? "00" : "30"} tim`;
 
 // Info om uppgiften
  return (
    <div className="todo">
      <p>Titel: {uppgift.title}</p>
      <p>Beskrivning: {uppgift.description}</p>
      <p>Tidsestimat: {formatTid(parseFloat(uppgift.estimate))}</p>
      <p>Deadline: {uppgift.deadline}</p>
      <p>Status: {uppgift.status}</p>
      <p>Kategori: {uppgift.category}</p>
      <Link to={`/task/${uppgift.id}`}>Redigera</Link>
    </div>
  );
 }
 
 
 export default Uppgift;
 
 