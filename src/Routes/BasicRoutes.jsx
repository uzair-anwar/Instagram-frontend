import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Account/Login";
import Signup from "../Components/Account/Signup";
import Navbar from "../Components/Navbar/Navbar";
import Main from "../Pages/Main";
import Profile from "../Pages/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import UndefineRoutes from "./UndefinedRoutes";
import CreatePost from "../Pages/CreatePost";
import EditPost from "../Pages/EditPost";
import CreateStory from "../Components/story/CreateStory";
import Story from "../Components/story/Story";
import EditProfile from "../Components/Account/EditProfile";
import UpdatePassword from "../Components/Account/UpdatePassword";
import Email from "../Components/Account/Email";
import NewPassword from "../Components/Account/NewPassword";
import SearchUser from "../Components/Account/SearchUser";
import Messenger from "../Pages/Messenger";

const BasicRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sendEmail" element={<Email />} />
        <Route path="/forgetPassword" element={<NewPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchUser />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/showPost" element={<CreatePost />} />
          <Route path="/Post/:id/edit" element={<EditPost />} />
          <Route path="/createStory" element={<CreateStory />} />
          <Route path="/showStory" element={<Story />} />
          <Route path="/messenger" element={<Messenger />} />
        </Route>
        <Route path="*" element={<UndefineRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BasicRoutes;
