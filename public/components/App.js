import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Canvas from "./Canvas.js";
import { ModelFormContextProvider } from '../contexts/ModelFormContext.js';

const App = () => {
    return (
        <BrowserRouter>
            <ModelFormContextProvider>
                <Routes>
                    <Route path="*" element={<Canvas />} />   
                </Routes> 
            </ModelFormContextProvider>
        </BrowserRouter>
    );
};

export default App;
