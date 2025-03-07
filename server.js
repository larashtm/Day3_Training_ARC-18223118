const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Mengizinkan akses dari frontend
app.use(express.json()); // Middleware untuk parsing JSON

// Data user dummy
const users = [
    { id: 1, name: "John Doe", email: "john@example.com", location: "USA" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", location: "UK" },
    { id: 3, name: "Alice Smith", email: "alice@example.com", location: "Canada" },
];

// Endpoint untuk mendapatkan daftar user
app.get("/api/users", (req, res) => {
    res.json(users);
});

// Endpoint untuk mendapatkan satu user berdasarkan ID
app.get("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(user);
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
