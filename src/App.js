import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cover.css";

const App = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-primary">{message || "Loading..."}</h1>
        </div>
    );
};

export default App;
