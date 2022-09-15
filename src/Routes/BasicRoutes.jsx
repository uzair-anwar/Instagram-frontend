import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { UserProvider } from "./Context/userContext";
import Login from "../Components/Account/Login";
import Signup from "../Components/Account/Signup";
import Navbar from "../Components/Navbar";
import Main from "../Pages/Main";
import Profile from "../Pages/Profile";
import CreratePost from "../Pages/CreratePost";
import ProtectedRoute from "./ProtectedRoutes";
import UndefineRoutes from "./UndefinedRoutes";
const BasicRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreratePost />} />
          {/*<Route path="drafts" element={<Main />} />
          <Route path="/Post/:id/edit" element={<EditPost />} />
          <Route path="/Draft/:id/edit" element={<EditDraftPost />} />*/}
        </Route>
        <Route path="*" element={<UndefineRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BasicRoutes;
