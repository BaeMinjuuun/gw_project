import { Routes, Route } from "react-router-dom";
import MainPage from "./main/MainPage";
import Signup from "./login/Signup.js";
import Login from "./login/Login";
import Profile from "./main/categorys/Profile/Profile.js";
import AttendanceMain from "./main/categorys/Attendance/AttendanceMain";
import MainHome from "./main/categorys/Main/MainHome";
import MainPostsBoard from "./main/categorys/Board/MainPostsBoard";
import WriteBoard from "./main/categorys/Board/WriteBoard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/mainHome" element={<MainHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<AttendanceMain />} />
          <Route path="/mainPostsBoard" element={<MainPostsBoard />} />
          <Route path="/writeBoard" element={<WriteBoard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
