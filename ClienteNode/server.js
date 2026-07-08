const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const API = "http://localhost:8080/peliculas";

const HTML = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CineVault - Plataforma de Cine Premium</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
    --bg-primary: #06090f;
    --bg-secondary: #0d1117;
    --bg-card: #161b22;
    --bg-card-hover: #1c2333;
    --border: rgba(255,255,255,0.06);
    --border-hover: rgba(255,255,255,0.12);
    --text-primary: #f0f6fc;
    --text-secondary: #8b949e;
    --text-muted: #484f58;
    --accent-blue: #58a6ff;
    --accent-purple: #bc8cff;
    --accent-pink: #f778ba;
    --accent-green: #3fb950;
    --accent-orange: #d29922;
    --accent-red: #f85149;
    --gradient-main: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-warm: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-cool: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
}

/* Ambient Background */
.ambient-bg {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
}

.ambient-bg::before {
    content: '';
    position: absolute;
    top: -20%; left: -20%;
    width: 140%; height: 140%;
    background:
        radial-gradient(ellipse at 10% 20%, rgba(88, 166, 255, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 90% 80%, rgba(188, 140, 255, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(247, 120, 186, 0.04) 0%, transparent 60%);
    animation: ambientShift 20s ease-in-out infinite alternate;
}

@keyframes ambientShift {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-2%, -1%) scale(1.05); }
}

/* Navigation */
.nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 40px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(6, 9, 15, 0.8);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s ease;
}

.nav.scrolled {
    background: rgba(6, 9, 15, 0.95);
    box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
}

.nav-logo {
    width: 40px; height: 40px;
    background: var(--gradient-main);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: white;
    font-weight: 800;
}

.nav-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.5px;
}

.nav-subtitle {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.nav-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-primary {
    background: var(--gradient-main);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-ghost {
    background: rgba(255,255,255,0.05);
    color: var(--text-secondary);
    border: 1px solid var(--border);
}

.btn-ghost:hover {
    background: rgba(255,255,255,0.08);
    color: var(--text-primary);
    border-color: var(--border-hover);
}

/* Hero Section */
.hero {
    position: relative;
    z-index: 1;
    margin-top: 70px;
    padding: 60px 40px 40px;
    background: linear-gradient(180deg, rgba(6,9,15,0) 0%, var(--bg-primary) 100%);
}

.hero-content {
    max-width: 1400px;
    margin: 0 auto;
}

.hero-stats {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
}

.stat-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px 28px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    background: rgba(255,255,255,0.05);
    border-color: var(--border-hover);
    transform: translateY(-2px);
}

.stat-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.stat-icon.blue { background: rgba(88, 166, 255, 0.1); color: var(--accent-blue); }
.stat-icon.purple { background: rgba(188, 140, 255, 0.1); color: var(--accent-purple); }
.stat-icon.pink { background: rgba(247, 120, 186, 0.1); color: var(--accent-pink); }
.stat-icon.green { background: rgba(63, 185, 80, 0.1); color: var(--accent-green); }

.stat-info h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: 'Space Grotesk', sans-serif;
}

.stat-info p {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 2px;
}

.hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: -1px;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #f0f6fc 0%, #8b949e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
    font-weight: 400;
    max-width: 500px;
}

/* Main Content */
.main {
    position: relative;
    z-index: 1;
    padding: 0 40px 60px;
    max-width: 1480px;
    margin: 0 auto;
}

/* Toolbar */
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    gap: 16px;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    flex: 1;
    max-width: 400px;
}

.search-box i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 0.9rem;
}

.search-box input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    outline: none;
}

.search-box input::placeholder { color: var(--text-muted); }

.search-box input:focus {
    border-color: var(--accent-blue);
    background: rgba(255,255,255,0.06);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
}

.filter-group {
    display: flex;
    gap: 8px;
}

.filter-btn {
    padding: 10px 18px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-secondary);
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn:hover, .filter-btn.active {
    background: rgba(88, 166, 255, 0.1);
    border-color: rgba(88, 166, 255, 0.3);
    color: var(--accent-blue);
}

.view-toggle {
    display: flex;
    gap: 4px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 4px;
}

.view-btn {
    width: 36px; height: 36px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.view-btn.active {
    background: rgba(88, 166, 255, 0.15);
    color: var(--accent-blue);
}

/* Grid Layout */
.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
}

.movies-grid.list-view {
    grid-template-columns: 1fr;
}

/* Movie Card */
.movie-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
}

.movie-card:hover {
    transform: translateY(-6px);
    border-color: var(--border-hover);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    background: var(--bg-card-hover);
}

.card-poster {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.card-poster-bg {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    opacity: 0.15;
}

.poster-gradient {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 100%;
    background: linear-gradient(180deg, transparent 30%, var(--bg-card) 100%);
}

.card-year-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 5px 12px;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    border: 1px solid rgba(255,255,255,0.1);
}

.card-body {
    padding: 20px;
}

.card-genre {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
}

.genre-action { background: rgba(248, 81, 73, 0.12); color: var(--accent-red); border: 1px solid rgba(248, 81, 73, 0.2); }
.genre-drama { background: rgba(210, 153, 34, 0.12); color: var(--accent-orange); border: 1px solid rgba(210, 153, 34, 0.2); }
.genre-scifi { background: rgba(88, 166, 255, 0.12); color: var(--accent-blue); border: 1px solid rgba(88, 166, 255, 0.2); }
.genre-default { background: rgba(188, 140, 255, 0.12); color: var(--accent-purple); border: 1px solid rgba(188, 140, 255, 0.2); }

.card-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
    line-height: 1.3;
}

.card-director {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 0.85rem;
    margin-bottom: 16px;
}

.card-director i {
    color: var(--text-muted);
    font-size: 0.8rem;
}

.card-actions {
    display: flex;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
}

.card-actions button {
    flex: 1;
    padding: 10px 14px;
    border: none;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.action-edit {
    background: rgba(88, 166, 255, 0.08);
    color: var(--accent-blue);
    border: 1px solid rgba(88, 166, 255, 0.15) !important;
}

.action-edit:hover {
    background: rgba(88, 166, 255, 0.15);
    border-color: rgba(88, 166, 255, 0.3) !important;
}

.action-delete {
    background: rgba(248, 81, 73, 0.08);
    color: var(--accent-red);
    border: 1px solid rgba(248, 81, 73, 0.15) !important;
}

.action-delete:hover {
    background: rgba(248, 81, 73, 0.15);
    border-color: rgba(248, 81, 73, 0.3) !important;
}

/* List View */
.movies-grid.list-view .movie-card {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    align-items: center;
}

.movies-grid.list-view .card-poster { display: none; }
.movies-grid.list-view .poster-gradient { display: none; }
.movies-grid.list-view .card-year-badge { display: none; }
.movies-grid.list-view .card-body { padding: 16px 24px; }
.movies-grid.list-view .card-genre { margin-bottom: 0; }
.movies-grid.list-view .card-title { margin-bottom: 4px; font-size: 1rem; }
.movies-grid.list-view .card-director { margin-bottom: 0; }
.movies-grid.list-view .card-actions { border-top: none; padding-top: 0; border-left: 1px solid var(--border); padding-left: 16px; flex-direction: column; min-width: 120px; }

.list-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    background: rgba(255,255,255,0.03);
    border-right: 1px solid var(--border);
}

/* Modal */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    z-index: 200;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal-overlay.active { display: flex; }

.modal {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 20px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalIn 0.3s ease;
}

@keyframes modalIn {
    from { opacity: 0; transform: scale(0.95) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-header {
    padding: 24px 28px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-header h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
}

.modal-close {
    width: 36px; height: 36px;
    border: none;
    border-radius: 10px;
    background: rgba(255,255,255,0.05);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    background: rgba(248, 81, 73, 0.1);
    color: var(--accent-red);
}

.modal-body { padding: 28px; }

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.form-group input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    outline: none;
}

.form-group input::placeholder { color: var(--text-muted); }

.form-group input:focus {
    border-color: var(--accent-blue);
    background: rgba(255,255,255,0.06);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.modal-footer {
    padding: 20px 28px;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

.modal-footer button {
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-modal-save {
    background: var(--gradient-main);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-modal-save:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-modal-cancel {
    background: rgba(255,255,255,0.05);
    color: var(--text-secondary);
    border: 1px solid var(--border);
}

.btn-modal-cancel:hover {
    background: rgba(255,255,255,0.08);
    color: var(--text-primary);
}

/* Toast */
.toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    border-radius: 14px;
    font-size: 0.9rem;
    font-weight: 500;
    z-index: 1000;
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    gap: 10px;
    animation: toastIn 0.4s ease, toastOut 0.4s ease 2.6s forwards;
    font-family: 'Inter', sans-serif;
}

.toast-success {
    background: rgba(63, 185, 80, 0.15);
    border: 1px solid rgba(63, 185, 80, 0.3);
    color: var(--accent-green);
}

.toast-error {
    background: rgba(248, 81, 73, 0.15);
    border: 1px solid rgba(248, 81, 73, 0.3);
    color: var(--accent-red);
}

@keyframes toastIn {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes toastOut {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(20px) scale(0.95); }
}

/* Empty State */
.empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
}

.empty-icon {
    width: 80px; height: 80px;
    margin: 0 auto 20px;
    background: rgba(255,255,255,0.03);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: var(--text-muted);
}

.empty-state h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.3rem;
    color: var(--text-secondary);
    margin-bottom: 8px;
}

.empty-state p {
    color: var(--text-muted);
    font-size: 0.9rem;
}

/* Animations */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
}

.movie-card { animation: fadeInUp 0.5s ease forwards; opacity: 0; }

/* Responsive */
@media (max-width: 768px) {
    .nav { padding: 0 20px; }
    .hero { padding: 40px 20px 30px; }
    .hero-stats { flex-wrap: wrap; gap: 12px; }
    .stat-card { flex: 1; min-width: 140px; padding: 14px 16px; }
    .stat-icon { width: 40px; height: 40px; font-size: 1rem; }
    .stat-info h3 { font-size: 1.2rem; }
    .hero-title { font-size: 1.8rem; }
    .main { padding: 0 20px 40px; }
    .movies-grid { grid-template-columns: 1fr; }
    .toolbar { flex-direction: column; align-items: stretch; }
    .search-box { max-width: 100%; }
    .filter-group { overflow-x: auto; padding-bottom: 4px; }
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
</style>
</head>
<body>

<div class="ambient-bg"></div>

<nav class="nav" id="navbar">
    <a class="nav-brand" href="/">
        <div class="nav-logo"><i class="fas fa-play"></i></div>
        <div>
            <div class="nav-title">CineVault</div>
            <div class="nav-subtitle">Premium Cinema</div>
        </div>
    </a>
    <div class="nav-actions">
        <button class="nav-btn btn-ghost" onclick="cargar()">
            <i class="fas fa-sync-alt"></i> Actualizar
        </button>
        <button class="nav-btn btn-primary" onclick="abrirModal()">
            <i class="fas fa-plus"></i> Nueva Película
        </button>
    </div>
</nav>

<section class="hero">
    <div class="hero-content">
        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon blue"><i class="fas fa-film"></i></div>
                <div class="stat-info">
                    <h3 id="stat-total">0</h3>
                    <p>Total Películas</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon purple"><i class="fas fa-tags"></i></div>
                <div class="stat-info">
                    <h3 id="stat-generos">0</h3>
                    <p>Géneros</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon pink"><i class="fas fa-calendar"></i></div>
                <div class="stat-info">
                    <h3 id="stat-reciente">-</h3>
                    <p>Más Reciente</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon green"><i class="fas fa-clock"></i></div>
                <div class="stat-info">
                    <h3 id="stat-antigua">-</h3>
                    <p>Más Antigua</p>
                </div>
            </div>
        </div>
        <h1 class="hero-title">Tu Catálogo de Cine</h1>
        <p class="hero-subtitle">Gestiona, organiza y descubre tu colección de películas favoritas en un solo lugar.</p>
    </div>
</section>

<main class="main">
    <div class="toolbar">
        <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchInput" placeholder="Buscar películas..." oninput="filtrarPeliculas()">
        </div>
        <div class="filter-group">
            <button class="filter-btn active" onclick="filtrarPorGenero('todos', this)">Todos</button>
            <button class="filter-btn" onclick="filtrarPorGenero('Acción', this)">Acción</button>
            <button class="filter-btn" onclick="filtrarPorGenero('Drama', this)">Drama</button>
            <button class="filter-btn" onclick="filtrarPorGenero('Ciencia Ficción', this)">Sci-Fi</button>
        </div>
        <div class="view-toggle">
            <button class="view-btn active" onclick="setView('grid', this)" title="Vista cuadrícula"><i class="fas fa-th-large"></i></button>
            <button class="view-btn" onclick="setView('list', this)" title="Vista lista"><i class="fas fa-list"></i></button>
        </div>
    </div>

    <div class="movies-grid" id="moviesGrid"></div>
</main>

<!-- Modal -->
<div class="modal-overlay" id="modal">
    <div class="modal">
        <div class="modal-header">
            <h2 id="modalTitle">Nueva Película</h2>
            <button class="modal-close" onclick="cerrarModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            <input type="hidden" id="pelicula-id">
            <div class="form-group">
                <label>Título</label>
                <input type="text" id="titulo" placeholder="Título de la película">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Director</label>
                    <input type="text" id="director" placeholder="Nombre del director">
                </div>
                <div class="form-group">
                    <label>Género</label>
                    <input type="text" id="genero" placeholder="Género cinematográfico">
                </div>
            </div>
            <div class="form-group">
                <label>Año de Estreno</label>
                <input type="number" id="anio" placeholder="2024">
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-modal-cancel" onclick="cerrarModal()">Cancelar</button>
            <button class="btn-modal-save" onclick="guardar()">
                <i class="fas fa-check"></i> Guardar
            </button>
        </div>
    </div>
</div>

<script>
let todasLasPeliculas = [];
let generoActual = 'todos';

const generoIcons = {
    'Acción': 'fa-hand-fist',
    'Drama': 'fa-masks-theater',
    'Ciencia Ficción': 'fa-rocket',
    'Comedia': 'fa-face-laugh-squint',
    'Terror': 'fa-ghost',
    'Romance': 'fa-heart',
    'default': 'fa-clapperboard'
};

const generoClasses = {
    'Acción': 'genre-action',
    'Drama': 'genre-drama',
    'Ciencia Ficción': 'genre-scifi',
    'default': 'genre-default'
};

const posterGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
];

function getGeneroIcon(g) { return generoIcons[g] || generoIcons['default']; }
function getGeneroClass(g) { return generoClasses[g] || generoClasses['default']; }
function getPosterGradient(id) { return posterGradients[id % posterGradients.length]; }

function toast(msg, type) {
    const t = document.createElement('div');
    t.className = 'toast toast-' + type;
    t.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function actualizarStats() {
    document.getElementById('stat-total').textContent = todasLasPeliculas.length;
    const generos = [...new Set(todasLasPeliculas.map(p => p.genero))];
    document.getElementById('stat-generos').textContent = generos.length;
    if (todasLasPeliculas.length > 0) {
        const sorted = [...todasLasPeliculas].sort((a, b) => b.anio - a.anio);
        document.getElementById('stat-reciente').textContent = sorted[0].anio;
        document.getElementById('stat-antigua').textContent = sorted[sorted.length - 1].anio;
    }
}

function cargar() {
    fetch("/api/peliculas")
    .then(res => res.json())
    .then(data => {
        todasLasPeliculas = data;
        actualizarStats();
        renderizarPeliculas(data);
    });
}

function renderizarPeliculas(peliculas) {
    const grid = document.getElementById("moviesGrid");
    grid.innerHTML = "";

    if (peliculas.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="fas fa-film"></i></div><h3>No se encontraron películas</h3><p>Agrega una nueva película o ajusta los filtros de búsqueda</p></div>';
        return;
    }

    peliculas.forEach((p, i) => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.style.animationDelay = (i * 0.08) + "s";
        card.innerHTML = \`
            <div class="card-poster" style="background: \${getPosterGradient(p.id)}">
                <div class="card-poster-bg"><i class="fas \${getGeneroIcon(p.genero)}"></i></div>
                <div class="poster-gradient"></div>
                <div class="card-year-badge">\${p.anio}</div>
            </div>
            <div class="list-icon" style="background: \${getPosterGradient(p.id)}; display:none;"><i class="fas \${getGeneroIcon(p.genero)}" style="opacity:0.8"></i></div>
            <div class="card-body">
                <div class="card-genre \${getGeneroClass(p.genero)}">\${p.genero}</div>
                <div class="card-title">\${p.titulo}</div>
                <div class="card-director"><i class="fas fa-user"></i> \${p.director}</div>
            </div>
            <div class="card-actions">
                <button class="action-edit" onclick='editar(\${JSON.stringify(p)})'><i class="fas fa-pen"></i> Editar</button>
                <button class="action-delete" onclick='eliminar(\${p.id})'><i class="fas fa-trash"></i> Eliminar</button>
            </div>
        \`;
        grid.appendChild(card);
    });
}

function filtrarPeliculas() {
    const busqueda = document.getElementById('searchInput').value.toLowerCase();
    let filtradas = todasLasPeliculas.filter(p =>
        p.titulo.toLowerCase().includes(busqueda) ||
        p.director.toLowerCase().includes(busqueda) ||
        p.genero.toLowerCase().includes(busqueda)
    );
    if (generoActual !== 'todos') {
        filtradas = filtradas.filter(p => p.genero === generoActual);
    }
    renderizarPeliculas(filtradas);
}

function filtrarPorGenero(genero, btn) {
    generoActual = genero;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtrarPeliculas();
}

function setView(view, btn) {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const grid = document.getElementById('moviesGrid');
    if (view === 'list') {
        grid.classList.add('list-view');
        grid.querySelectorAll('.list-icon').forEach(el => el.style.display = 'flex');
    } else {
        grid.classList.remove('list-view');
        grid.querySelectorAll('.list-icon').forEach(el => el.style.display = 'none');
    }
}

function abrirModal() {
    document.getElementById('modalTitle').textContent = 'Nueva Película';
    document.getElementById('pelicula-id').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('director').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('modal').classList.add('active');
}

function cerrarModal() {
    document.getElementById('modal').classList.remove('active');
}

function editar(p) {
    document.getElementById('modalTitle').textContent = 'Editar Película';
    document.getElementById('pelicula-id').value = p.id;
    document.getElementById('titulo').value = p.titulo;
    document.getElementById('director').value = p.director;
    document.getElementById('genero').value = p.genero;
    document.getElementById('anio').value = p.anio;
    document.getElementById('modal').classList.add('active');
}

function guardar() {
    const id = document.getElementById('pelicula-id').value;
    const pelicula = {
        titulo: document.getElementById('titulo').value,
        director: document.getElementById('director').value,
        genero: document.getElementById('genero').value,
        anio: parseInt(document.getElementById('anio').value)
    };

    const method = id ? "PUT" : "POST";
    const url = id ? "/api/peliculas/" + id : "/api/peliculas";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula)
    }).then(res => {
        if (res.ok) {
            toast(id ? "Película actualizada correctamente" : "Película creada correctamente", "success");
            cerrarModal();
            cargar();
        } else {
            toast("Error al guardar la película", "error");
        }
    }).catch(() => toast("Error de conexión con el servidor", "error"));
}

function eliminar(id) {
    if (confirm("¿Estás seguro de eliminar esta película?")) {
        fetch("/api/peliculas/" + id, { method: "DELETE" })
        .then(res => {
            if (res.ok) {
                toast("Película eliminada", "success");
                cargar();
            } else {
                toast("Error al eliminar", "error");
            }
        }).catch(() => toast("Error de conexión", "error"));
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// Close modal on overlay click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) cerrarModal();
});

cargar();
</script>

</body>
</html>
`;

app.get("/", (req, res) => res.send(HTML));

app.get("/api/peliculas", async (req, res) => {
    try {
        const response = await axios.get(API);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Error backend" });
    }
});

app.post("/api/peliculas", async (req, res) => {
    try {
        const response = await axios.post(API, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Error backend" });
    }
});

app.put("/api/peliculas/:id", async (req, res) => {
    try {
        const response = await axios.put(API + "/" + req.params.id, req.body);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Error backend" });
    }
});

app.delete("/api/peliculas/:id", async (req, res) => {
    try {
        await axios.delete(API + "/" + req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: "Error backend" });
    }
});

app.listen(3000, () => {
    console.log("Frontend en http://localhost:3000");
});
