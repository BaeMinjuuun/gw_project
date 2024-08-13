import { Routes, Route } from "react-router-dom";
import MainPage from "./main/MainPage";
import Signup from "./login/Signup.js";
import Login from "./login/Login";
import Profile from "./main/categorys/Profile/Profile.js";
import AttendanceMain from "./main/categorys/Attendance/AttendanceMain";
import MainHome from "./main/categorys/Main/MainHome";
import MainPostsBoard from "./main/categorys/Board/MainPostsBoard";
import WriteBoard from "./main/categorys/Board/WriteBoard";
import PostDetail from "./main/categorys/Board/PostDetail";
import ConferenceRoom from "./main/categorys/Reservation/ConferenceRoom.js";
import Car from "./main/categorys/Reservation/Car.js";
import ResourceManage from "./main/categorys/Resource/ResourceManage.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="" element={<MainHome />} />
          <Route path="/mainHome" element={<MainHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<AttendanceMain />} />
          <Route path="/mainPostsBoard" element={<MainPostsBoard />} />
          <Route path="/writeBoard" element={<WriteBoard />} />
          <Route path="/postDetail/:id" element={<PostDetail />} />
          <Route path="/conferenceRoom" element={<ConferenceRoom />} />
          <Route path="/car" element={<Car />} />
          <Route path="/resourceManage" element={<ResourceManage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
