const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //TRAE TODOS LOS INSCRIPTOS DE LA TABLA inscriptos_mov
    //QUE SEAN DEL NIVEL INDICADO EN id_nivel
    console.log('ingresa a getAllInscriptosMov');
    const {id_nivel} = req.body;

    console.log('que trae id_nivel: ', id_nivel);

    try{
        const [result] = await pool.query(`SELECT id_inscriptos_mov, cargo_actual, cargo_solicitado, dni, apellido, nombre, observacion, total, orden, nro_escuela, legajo, id_especialidad, id_tipo_inscripto, id_nivel
            FROM inscriptos_mov
            WHERE id_nivel = ${id_nivel}
            `);

        console.log('que trae result getAllInscriptosMov: ', result);

        res.status(200).json(result);
        
    }catch(error){
        res.status(400).send(error.message);
    }

};