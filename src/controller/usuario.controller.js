
let {Usuario}    = require("../models/classUsuario");
const connection = require("../database")


let newUsuario = null;
 
let arrayUsuario = [];

function getStart(request, response) {
 
    let respuesta = {error: true, codigo: 200, mensaje: "Punto de Inicio"};
    response.send(respuesta);
    next();
}


function postUsuario(request, response) 
{
    console.log("Entro en controller POST")
    console.log(request.body)

    let sql = "INSERT INTO usuario (nombre, apellidos, correo, url, password)" + 
              "VALUES ('" + request.body.nombre         + "', '" +
                            request.body.apellidos      + "', '" +
                            request.body.correo         + "', '" +
                            request.body.url            + "', '" +
                            request.body.password       + "')";

    console.log(sql);
    connection.query(sql, function (err,result)
    {
        if (err)
            console.log(err);
        else
        {

            response.send(result);

            // console.log(result);
            // if (result.insertId)
                // response.send(string(result.insertId));
              
            // else
            //     response.send("-1");
        }
    })              
}



function getUsuario(request, response)
{

    console.log("ESTOY ENTRANDO DESDE LA PRUEBA DEL SERVICIO")
    console.log("USUARIO: " + request)

    // console.log(request.body.correo);
    // console.log(request.body.password);

    let sql = `SELECT id_usuario, nombre, apellidos, correo, url FROM usuario WHERE correo = "${request.body.correo}" AND password = "${request.body.password}"`;

    console.log(request.body.correo)

    if (sql == "" || sql == null || sql == [])  {

        console.log("LOS DATOS SON INCORRECTOS")
    }
    else 
    {
    
        connection.query(sql, function (err, result)
            {
                console.log(result)

                if (err)
                    console.log(err);
                else
                {
                    if (result.length == 0) {

                        let array = [{error: true, message: "El correo y la contraseña no coinciden ", result:result}]
                        console.log("El correo y la contraseña no coinciden " + JSON.stringify(result))
                        response.send(array);

                    }else {

                        let array = [{error:false, message: "El correo y la contraseña coinciden ", result:result}]
                        console.log("El correo y las contraseña coinciden " + JSON.stringify(result))
                        response.send(array);
                    }
            

                    console.log("HE ENCONTRADO EL USUARIO")
                    console.log(result);
                    response.send(result);
                }
            })
        }

    }


module.exports = {getStart, postUsuario, getUsuario}

