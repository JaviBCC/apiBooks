let {Notas}         = require("../models/classNotas")
let {Alumnos}       = require("../models/classAlumnos");


const connection = require("../database")


function getStart(request, response) {
 
    let respuesta = {error: true, codigo: 200, mensaje: "Punto de Inicio"};
    response.send(respuesta);
    next();
}


function getMedia(request, response)
{
    let sql;

    console.log("Aquí el params");
    console.log(request.params.id);

    if (request.params.id)
        // sql = "SELECT student_id, AVG(mark) AS nota_media FROM marks WHERE student_id = " + request.params.id;

        sql = "SELECT AVG(mark) AS nota_media, students.first_name, students.last_name FROM marks INNER JOIN students ON (students.student_id = marks.student_id) WHERE students.student_id = " + request.params.id;

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


function getApuntadas(request, response)
{
    let sql;

    console.log("Aquí el params");
    console.log(request.params.id);

    let auxId = request.params.id;
    console.log("Tiene vale de " + auxId);

    if (request.params.id)
        // sql = "SELECT student_id, subject_id FROM marks WHERE student_id = " + request.params.id;
        // sql = "SELECT first_name, last_name, title FROM students JOIN marks ON (students.student_id = " + request.params.id + ") JOIN subjects ON (marks.subject_id = subjects.subject_id) ";
        // sql = "SELECT first_name, last_name, title FROM students INNER JOIN  ON (" + request.params.id + "= marks.params.id) INNER JOIN subjects ON (marks.subject_id = subjects.subject_id) ";
        
        sql = "SELECT first_name, last_name, title FROM students JOIN marks ON (students.student_id = marks.student_id) JOIN subjects ON (marks.subject_id = subjects.subject_id) WHERE students.student_id = " + auxId;
        
    else
        sql = "SELECT first_name, last_name, title FROM students JOIN marks ON (students.student_id = marks.student_id) JOIN subjects ON (marks.subject_id = subjects.subject_id) ORDER BY students.student_id";
    
        
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



function getImpartidas(request, response)
{
    let sql;

    console.log("Aquí el params");
    console.log(request.params.id);

    let auxId = request.params.id;

    console.log(auxId);

    if (request.params.id)
        // sql = "SELECT teacher_id, subject_id FROM teachers WHERE teacher_id = " + request.params.id;
        sql = "SELECT teachers.first_name, teachers.last_name, subjects.title FROM students INNER JOIN subject_teacher ON (students.group_id = subject_teacher.group_id) INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id) INNER JOIN teachers ON (subject_teacher.teacher_id = teachers.teacher_id) WHERE teachers.teacher_id = " + auxId;
    else
        sql = "SELECT teachers.first_name, teachers.last_name, subjects.title FROM students INNER JOIN subject_teacher ON (students.group_id = subject_teacher.group_id) INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id) INNER JOIN teachers ON (subject_teacher.teacher_id = teachers.teacher_id) ORDER BY teachers.teacher_id";
    
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




module.exports = {getStart, getMedia, getApuntadas, getImpartidas}