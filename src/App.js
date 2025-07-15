//CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
//Router
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
