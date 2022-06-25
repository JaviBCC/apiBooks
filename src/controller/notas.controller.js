let {Notas} = require("../models/classNotas")
const connection = require("../database")


let newMark = null;
 
let arrayMark = [];

function getStart(request, response) {
 
    let respuesta = {error: true, codigo: 200, mensaje: "Punto de Inicio"};
    response.send(respuesta);
    next();
}


function getNotas(request, response)
{
    let sql;

    console.log("Aquí el params");
    console.log(request.params.id);

    if (request.params.id)
        sql = "SELECT * FROM marks WHERE student_id = " + request.params.id;

    else
        console.log("No hay Id informado");
    
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


function postNotas(request, response) 
{

    console.log(request.body)

    let sql = "INSERT INTO marks (student_id, subject_id, date, mark)" + 
                "VALUES ('" +   request.body.student_id      + "', '" +
                                request.body.subject_id      + "', '" +
                                request.body.date            + "', '" +
                                request.body.mark            + "')";


    connection.query(sql, function (err,result)
    {
        if (err)
            console.log(err);
        else
        {

            response.send(result);

            console.log(result);

            // if (result.insertId)
            //     response.send(string(result.insertId));
              
            // else
            //     response.send("-1");
        }
    })              
}


function putNotas( request, response ) {

    console.log("Entro por Put de Backend")
    console.log("Pongo otro mensaje para ver que coño pasa")

    let id              = request.body.student_id;
    let subject_id      = request.body.subject_id;
    let date            = request.body.date;
    let mark            = request.body.mark;


    let params;
    let updateNota;


    if ((date == "") && (mark != "")) 
    {       
            // params = [id, subject_id, mark]
            params = [mark, id, subject_id] 
            updateNota = `UPDATE marks SET mark = COALESCE(?, mark) WHERE student_id =? AND subject_id =?`;

    } else if ((date != "") && (mark != "")) {
            console.log("Paso por actualizacion con Fecha")
            
            params = [mark, date, id, subject_id]
            updateNota = `UPDATE marks SET mark = COALESCE(?, mark) date = COALESCE(?, date) WHERE student_id =? AND subject_id =?`;

    }   

                
    console.log(params);

    // let updateNota = `UPDATE marks SET subject_id = COALESCE(?, subject_id), date = COALESCE(?, date), mark = COALESCE(?, mark) WHERE student_id =? AND subject_id =?`


    console.log("paso por aqui")
    

    connection.query(updateNota, params, function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {
            response.send(result);
            if(result.insertId)
                response.send(String(result.insertId))
            else
                // response.send(respuesta)
                console.log("eres muuuuu tonto")
        }
    })
    
}


function deleteNotas(request, response) {

    let params;
    let delNota;

    let id = request.body.id;

    let subject = request.body.subject_id;



        if ((id != null) && (subject == null)) {

            params = [id]
            delNota = `DELETE FROM marks WHERE student_id=?`;

        } else if ((id != null) && (subject != null)) {

            params = [id, subject];
            delNota = `DELETE FROM marks WHERE student_id=? AND subject_id =?`
        }

        
        // let delNota = `DELETE FROM marks WHERE student_id=?`;


        connection.query(delNota, params, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                console.log("Nota borrada");
                console.log(result);
            }
            response.send(result)
    })
}





module.exports = {getStart, getNotas, postNotas, putNotas, deleteNotas};