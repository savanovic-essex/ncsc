import * as React from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
}
