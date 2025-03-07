const express = require('express');
const app = express();
const port = 3000;

// Endpoint sederhana untuk mengembalikan data JSON
app.get('/api/data', (req, res) => {
    res.json({ message: "Halo, ini data dari API lokal!" });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
