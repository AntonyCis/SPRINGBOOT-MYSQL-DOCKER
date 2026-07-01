const express = require("express");
const axios = require("axios");

const app = express();

const API = "http://localhost:8080/peliculas";

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Películas</title>

<style>
body {
    font-family: Arial, sans-serif;
    background: #0f172a;
    margin: 0;
    color: white;
}

header {
    padding: 20px;
    text-align: center;
    background: #1e293b;
}

h1 {
    margin: 0;
}

.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card {
    background: #1e293b;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.4);
    transition: transform 0.2s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.titulo {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #38bdf8;
}

.info {
    font-size: 14px;
    margin: 5px 0;
    color: #cbd5e1;
}

.badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 8px;
    background: #334155;
    font-size: 12px;
    margin-top: 8px;
}
</style>

</head>
<body>

<header>
    <h1>🎬 Catálogo de Películas</h1>
</header>

<div class="container" id="grid"></div>

<script>
fetch("/api/peliculas")
.then(res => res.json())
.then(data => {
    const grid = document.getElementById("grid");

    data.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = \`
            <div class="titulo">\${p.titulo}</div>
            <div class="info">🎬 Director: \${p.director}</div>
            <div class="info">📅 Año: \${p.anio}</div>
            <div class="badge">\${p.genero}</div>
        \`;

        grid.appendChild(card);
    });
});
</script>

</body>
</html>
    `);
});

// API proxy
app.get("/api/peliculas", async (req, res) => {
    try {
        const response = await axios.get(API);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Error backend" });
    }
});

app.listen(3000, () => {
    console.log("Frontend en http://localhost:3000");
});