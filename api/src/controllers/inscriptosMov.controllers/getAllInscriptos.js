const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //TRAE TODOS LOS INSCRIPTOS DE LA TABLA inscriptos_mov
    try{
        const [result] = await pool.query(`SELECT id_inscriptos_mov, cargo_actual, cargo_solicitado, dni, apellido, nombre, observacion, total, orden, nro_escuela, legajo, id_especialidad, id_tipo_inscripto 
            FROM inscriptos_mov`);

        console.log('que trae result getAllInscriptos: ', result);

        res.status(200).json(result);
        
    }catch(error){
        res.status(400).send(error.message);
    }

};