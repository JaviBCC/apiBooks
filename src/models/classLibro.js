
class Libro {
    id_libro;
    id_usuario;
    titulo;
    tipo;
    autor;
    precio;
    url;

    constructor(id_libro, id_usuario, titulo, tipo, autor, precio, url) {
            this.id_libro       = id_libro;
            this.id_usuario     = id_usuario;
            this.titulo         = titulo;
            this.tipo           = tipo;
            this.autor          = autor;
            this.precio         = precio;
            this.url            = url;
           
    }
}


module.exports = {Libro};





