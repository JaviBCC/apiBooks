
const { response } = require("express");
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



function getUsuario(request, response) {

    let res = {};
    let param = [request.body.correo,request.body.password]

    let sql = "SELECT * FROM usuario WHERE correo =?  AND password =?"

    connection.query(sql,param, function (err, result) {

        if (err)
            console.log(err);
        else {
            if(result.length > 0){
                res = {error:false, message:"La contraseña y el correo SI coinciden ", result:result}      
               
            }else{
                res = {error: true, message: "La contraseña y el correo NO coinciden ", result:result}         
            }
            } response.send(res);
        }
    )}


    // if (sql == "" || sql == null || sql == [])  {

    //     console.log("LOS DATOS SON INCORRECTOS")
    // }
    // else 
    // {
    
    //     connection.query(sql, function (err, result)
    //         {
    //             console.log(result)
    //             let res;

    //             if (err)
    //                 console.log(err);
    //             else
    //             {
    //                 if (result.length == 0) {

    //                     // let array = [{error: true, message: "El correo y la contraseña no coinciden ", result:result}]
    //                     console.log("El correo y la contraseña no coinciden " + JSON.stringify(result))
    //                     //  response.send(array);
    //                     res = {error: true, message: "El correo y la contraseña no coinciden ", result:result}

    //                 }else {

    //                     console.log("El correo y las contraseña coinciden " + JSON.stringify(result))
    //                     res = {error:false, message: "El correo y la contraseña coinciden ", result:result}
    //                 }
            

    //                 console.log("HE ENCONTRADO EL USUARIO")
    //                 console.log(result);
    //                 console.log(res)
    //                 response.send(res);
    //             }
    //         })
    //     }

    // }


module.exports = {getStart, postUsuario, getUsuario}

