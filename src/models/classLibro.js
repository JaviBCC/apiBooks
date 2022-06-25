
class Libro {
    id_libro;
    id_usuario;
    titulo;
    tipo;
    autor;
    precio;
    foto;

    constructor(id_libro, id_usuario, titulo, tipo, autor, precio, foto) {
            this.id_libro       = id_libro;
            this.id_usuario     = id_usuario;
            this.titulo         = titulo;
            this.autor          = autor;
            this.precio         = precio;
            this.foto           = foto;
           
    }
}


module.exports = {Libro};





