const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //TRAE TODOS LOS INSCRIPTOS DE LA TABLA inscriptos_mov
    //QUE SEAN DEL NIVEL INDICADO EN EL LISTADO id_listado_inscriptos
    console.log('ingresa a getAllInscriptosMov');
    const {id_listado_inscriptos} = req.body;

    console.log('que trae id_listado_inscriptos: ', id_listado_inscriptos);

    try{
        const [result] = await pool.query(`SELECT im.id_inscriptos_mov, im.cargo_actual, im.cargo_solicitado, im.dni, im.apellido, im.nombre, im.observacion, im.total, im.orden, im.nro_escuela, im.legajo, im.id_especialidad, e.descripcion AS especialidad, im.id_tipo_inscripto, ti.descripcion AS tipoinscripto, im.id_listado_inscriptos, li.descripcion, am.id_vacante_mov AS vacante_asignada
            FROM inscriptos_mov AS im
            LEFT JOIN especialidad AS e ON im.id_especialidad = e.id_especialidad 
            LEFT JOIN tipo_inscripto AS ti ON im.id_tipo_inscripto = ti.id_tipo_inscripto
            LEFT JOIN listado_inscriptos AS li ON im.id_listado_inscriptos = li.id_listado_inscriptos
            LEFT JOIN asignacion_mov AS am ON im.id_inscriptos_mov = am.id_inscripto_mov
            WHERE im.id_listado_inscriptos = ${id_listado_inscriptos}
            `);

        console.log('que trae result getAllInscriptosMov: ', result);

        res.status(200).json(result);
        
    }catch(error){
        res.status(400).send(error.message);
    }

};