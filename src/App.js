import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import MainPage from "./main/MainPage";
import Signup from "./login/Signup.js";
import Login from "./login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
