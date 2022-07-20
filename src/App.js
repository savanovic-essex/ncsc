import * as React from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./App.css";
import Home from "./views/Home";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            {/*<Route path="about" element={<About />} />*/}
        </Routes>
    );
}
