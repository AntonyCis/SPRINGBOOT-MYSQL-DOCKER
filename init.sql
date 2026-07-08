USE cine;

CREATE TABLE peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    director VARCHAR(100),
    genero VARCHAR(50),
    anio INT
);

INSERT INTO peliculas (titulo,director,genero,anio)
VALUES
    ('Titanic','James Cameron','Drama',1997),
    ('Avatar','James Cameron','Ciencia Ficción',2009),
    ('Interestelar','Christopher Nolan','Ciencia Ficción',2014),
    ('Batman Begins','Christopher Nolan','Acción',2005);