import express from "express";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';
import { models_routes } from "./api/models.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(__filename, "..");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

//Externally defined routes
app.use(models_routes);

//Log a couple of blank lines before program starts
console.log("");
console.log("");

// API Fallback API Response
app.get('/api/*', (req, res) => {
    res.status(404);
    res.json({ message: 'Unknown API endpoint' });
});

// Catch-all for SPA (React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    //info_js(`Server running on port ${PORT}`);
});
