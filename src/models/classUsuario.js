
class Usuario {
    id_usuario;
    nombre;
    apellidos;
    correo;
    url;
    password;

    constructor(nombre, apellidos, correo, url, password) {
            this.idusuario      = idusuario
            this.nombre         = nombre;
            this.apellidos      = apellidos;
            this.correo         = correo;
            this.url            = url;
            this.password       = password;     
    }
}


module.exports = {Usuario};