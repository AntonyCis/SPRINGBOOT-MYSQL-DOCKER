package com.tuproyecto.service;

import com.tuproyecto.model.Pelicula;
import com.tuproyecto.repository.PeliculaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeliculaService {

    private final PeliculaRepository repo;

    public PeliculaService(PeliculaRepository repo) {
        this.repo = repo;
    }

    public List<Pelicula> listar() {
        return repo.findAll();
    }

    public Pelicula obtenerPorId(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public Pelicula guardar(Pelicula pelicula) {
        return repo.save(pelicula);
    }

    public Pelicula actualizar(Integer id, Pelicula pelicula) {
        if (!repo.existsById(id)) return null;
        pelicula.setId(id);
        return repo.save(pelicula);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}