import React from "react";
import BasicRoutes from "./Routes/BasicRoutes";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BasicRoutes />
      <ToastContainer />;
    </>
  );
}

export default App;
