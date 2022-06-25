
class Usuario {

    nombre;
    apellidos;
    correo;
    foto;
    password;

    constructor(nombre, apellidos, correo, foto, password) {
        
            this.nombre         = nombre;
            this.apellidos      = apellidos;
            this.correo         = correo;
            this.foto           = foto;
            this.password       = password;     
    }
}


module.exports = {Usuario};