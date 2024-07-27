import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import MainPage from "./main/MainPage";
import Signup from "./login/Signup.js";
import Login from "./login/Login";
import Profile from "./main/categorys/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
