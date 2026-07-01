package com.tuproyecto.model;

import jakarta.persistence.*;

@Entity
@Table(name = "peliculas")
public class Pelicula {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        private String titulo;
        private String director;
        private String genero;
        private Integer anio;

        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }

        public String getTitulo() { return titulo; }
        public void setTitulo(String titulo) { this.titulo = titulo; }

        public String getDirector() { return director; }
        public void setDirector(String director) { this.director = director; }

        public String getGenero() { return genero; }
        public void setGenero(String genero) { this.genero = genero; }

        public Integer getAnio() { return anio; }
        public void setAnio(Integer anio) { this.anio = anio; }
}