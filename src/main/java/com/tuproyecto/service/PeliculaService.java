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
}