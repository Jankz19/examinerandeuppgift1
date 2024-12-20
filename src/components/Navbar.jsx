import { useNavigate } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/")}>Homepage</button>
      <button onClick={() => navigate("/habits")}>Habit App</button>
      <button onClick={() => navigate("/Todos")}>Todo App</button>
      <button onClick={() => navigate("/Calendar")}>Calendar app</button>
    </nav>
  );
};

export default Navbar;