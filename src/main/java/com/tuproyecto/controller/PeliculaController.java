package com.tuproyecto.controller;

import com.tuproyecto.model.Pelicula;
import com.tuproyecto.service.PeliculaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/peliculas")
public class PeliculaController {

    private final PeliculaService service;

    public PeliculaController(PeliculaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pelicula> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pelicula> obtenerPorId(@PathVariable Integer id) {
        Pelicula pelicula = service.obtenerPorId(id);
        return pelicula != null ? ResponseEntity.ok(pelicula) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Pelicula guardar(@RequestBody Pelicula pelicula) {
        return service.guardar(pelicula);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pelicula> actualizar(@PathVariable Integer id, @RequestBody Pelicula pelicula) {
        Pelicula actualizada = service.actualizar(id, pelicula);
        return actualizada != null ? ResponseEntity.ok(actualizada) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}