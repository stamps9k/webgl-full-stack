import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Canvas from "./Canvas.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Canvas />} />   
            </Routes> 
        </BrowserRouter>
    );
};

export default App;
