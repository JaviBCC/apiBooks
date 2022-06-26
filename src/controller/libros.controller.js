let {Libro}    = require("../models/classLibro");
const connection = require("../database")


let newMark = null;
 
let arrayMark = [];

function getStart(request, response) {
 
    let respuesta = {error: true, codigo: 200, mensaje: "Punto de Inicio"};
    response.send(respuesta);
    next();
}



function getLibros(request, response)
{
    let sql;

    console.log("Aquí el params");
    console.log(request.params.id);

    if (request.params.id)
        sql = "SELECT * FROM libro WHERE id_libro = " + request.params.id;

    else
        sql = "SELECT * FROM libro";
    
    connection.query(sql, function (err, result)
        {
            console.log(result)

            if (err)
                console.log(err);
            else
            {
                console.log(result);
                response.send(result);
            }
        })
}


function postLibros(request, response) 
{

    console.log(request.body)

    let sql = "INSERT INTO libro (id_usuario, titulo, tipo, autor, precio, url)" + 
              "VALUES ('" + request.body.id_usuario  + "', '" +
                            request.body.titulo      + "', '" +
                            request.body.tipo        + "', '" +
                            request.body.autor       + "', '" +
                            request.body.precio      + "', '" +
                            request.body.url         + "')";

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



function putLibros(request, response ) {

    console.log("Entro por Put de Backend")
    console.log("Pongo otro mensaje para ver que coño pasa")

    if (request.query.id != "") {

        let id_libro        = request.body.id_libro
        let id_usuario      = request.body.id_usuario;
        let titulo          = request.body.titulo;
        let tipo            = request.body.tipo;
        let autor           = request.body.autor;
        let precio          = request.body.precio;
        let url             = request.body.url;

        let params = [id_usuario, titulo, tipo, autor, precio, url, id_libro]
        
        let updateLibro = "UPDATE libro SET         id_usuario  = COALESCE(?, id_usuario),  " +
                                                 "  titulo      = COALESCE(?, titulo),      " +
                                                 "  tipo        = COALESCE(?, tipo),        " +
                                                 "  autor       = COALESCE(?, autor),       " +
                                                 "  precio      = COALESCE(?, precio),      " +    
                                                 "  url         = COALESCE(?, url)   WHERE id_libro = " + request.query.id; 
                                      


        console.log(updateLibro);
        console.log("paso por aqui")

        connection.query(updateLibro, params, function (err, result) 
        {
            if (err) 
                console.log(err);
            else 
            {
                console.log(result);

                if(result.insertId)
                    response.send(String(result.insertId))
                else
                    response.send(result)
                    console.log("eres muuuuu tonto")
            }
        })

    } else {

       console.log("Id incorrecto");
    }

}


function deleteLibros(request, response) {

    let id = request.body.id;

          if (request.query.id != "") {

            let delLibro = "DELETE FROM libro WHERE id_libro=" + request.query.id;


        connection.query(delLibro, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                console.log("Libro borrado");
                console.log(result);
            }
            response.send(result)
    })
    }   

}




module.exports = {getStart, getLibros, postLibros, putLibros, deleteLibros};

// module.exports = {getStart, getNotas, postNotas, putNotas, deleteNotas};