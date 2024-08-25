const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //TRAE TODOS LAS ESPECIALIDADES DE TABLA ESPECIALIDAD
    try{
        const [result] = await pool.query(`SELECT id_vacante_mov, id_listado_vac_mov, orden, establecimiento, obs_establecimiento, region, departamento, localidad, cargo, turno, modalidad, cupof, id_especialidad, datetime_creacion, obs_desactiva, zona
            FROM vacantes_mov`);

        console.log('que trae result getAllVacantesMov: ', result);

        res.status(200).json(result);
        
    }catch(error){
        res.status(400).send(error.message);
    }

};