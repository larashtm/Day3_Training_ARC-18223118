const express = require('express');
const app = express();
const port = 3000;

app.get('/api/data', (req, res) => {
    res.json({ message: "Halo, ini data dari API lokal!" });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
