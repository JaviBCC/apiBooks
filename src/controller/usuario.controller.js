
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

    console.log(request.body.correo);
    console.log(request.body.password);

    let sql = `SELECT id_usuario, nombre, apellidos, correo, url FROM usuario WHERE correo = "${request.body.correo}" AND password = "${request.body.password}"`;

    
    if (sql == "" || sql == null) {
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
                    console.log("HE ENCONTRADO EL USUARIO")
                    console.log(result);
                    response.send(result);
                }
            })
        }

    }



module.exports = {getStart, postUsuario, getUsuario}










// function putAlumnos( request, response ) {

//     console.log("Entro por Put de Backend")
//     console.log("Pongo otro mensaje para ver que coño pasa")

//     let first_name      = request.body.first_name;
//     let last_name       = request.body.last_name;
//     let id              = request.body.student_id;

//     let params;
//     let updateAlumno

//     if ((first_name == "") && (last_name != "")) 
//     {
//             params = [last_name, id]
//             updateAlumno = `UPDATE students SET last_name = COALESCE(?, last_name) WHERE student_id = ?`;

//     } else if ((last_name == "") && (first_name != "")) { 
//             params = [first_name, id]
//             updateAlumno = `UPDATE students SET first_name = COALESCE(?, first_name) WHERE student_id = ?`;

//     } else if ((first_name != "") && (last_name != "")) {
//             params = [first_name, last_name, id];
//             updateAlumno = `UPDATE students SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name) WHERE student_id = ?`;
//     }       
                 
//     console.log(params);

//     // let updateAlumno = `UPDATE students SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name) WHERE student_id = ?`


//                 // UPDATE students SET first_name = 'Manuel', last_name = 'martin', income_year = '2021-06-18' 
//                 // WHERE student_id = 31;


//     console.log("paso por aqui")

//     connection.query(updateAlumno, params, function (err, result) 
//     {
//         if (err) 
//             console.log(err);
//         else 
//         {
//             response.send(result);
//             if(result.insertId)
//                 response.send(String(result.insertId))
//             else
//                 // response.send(respuesta)
//                 console.log("eres muuuuu tonto")
//         }
//     })
    
// }

             
// function deleteAlumnos(request, response) {

//     let id = request.body.id;

//         let params = [id];

//         let delAlumno = `DELETE FROM students WHERE student_id=?`;

//         connection.query(delAlumno, params, function(err, result)
//         {
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Alumno borrado");
//                 console.log(result);
//             }
//             response.send(result)
//     })
// }




    
    // , postAlumnos, putAlumnos, deleteAlumnos};
