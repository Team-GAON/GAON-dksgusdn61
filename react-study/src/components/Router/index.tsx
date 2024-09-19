import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Main";
import Signup from "../Signup";
import Login from "../Login";
import Write from "../../Write";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
