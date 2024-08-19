const express = require('express');
const cors = require('cors');
const traineeRoutes = require('./routes/traineeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/trainees", traineeRoutes);

// Fallback route for undefined routes
app.get("/*", (req, res) => {
    res.status(404).send("No Routes found");
});

// Listen on the port provided by Vercel or fallback to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
