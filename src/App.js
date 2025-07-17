//CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import List from "./pages/List";
import Home from "./pages/Home";

//Router
import { Routes, Route } from "react-router";
//Components
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<List />} />
      </Routes>
    </>
  );
}

export default App;
