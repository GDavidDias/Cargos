const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //TRAE TODAS LAS VACANTES DE MOVIMIENTOS SEGUN EL NIVEL INDICADO EN EL LISTADO_VAC_MOV
    const{idListadoVacMov} = req.body;
    console.log('que trae idListadoVacMov: ', idListadoVacMov);

    try{
        // const [result] = await pool.query(`SELECT id_vacante_mov, id_listado_vac_mov, orden, establecimiento, obs_establecimiento, region, departamento, localidad, cargo, turno, modalidad, cupof, id_especialidad, datetime_creacion, obs_desactiva, zona
        //     FROM vacantes_mov
        //     WHERE id_listado_vac_mov=${idListadoVacMov}`);
        const [result] = await pool.query(`SELECT vm.id_vacante_mov, vm.id_listado_vac_mov, vm.orden, vm.establecimiento, vm.obs_establecimiento, vm.region, vm.departamento, vm.localidad, vm.cargo, vm.turno, vm.modalidad, vm.cupof, vm.id_especialidad, vm.datetime_creacion, vm.obs_desactiva, vm.zona, am2.datetime_asignacion , am2.id_estado_asignacion
            FROM vacantes_mov AS vm
            LEFT JOIN (SELECT am.id_vacante_mov, am.datetime_asignacion , am.id_estado_asignacion FROM asignacion_mov AS am WHERE am.obs_desactiva IS NULL) AS am2 ON vm.id_vacante_mov = am2.id_vacante_mov
            WHERE (vm.obs_desactiva IS NULL OR vm.obs_desactiva = "")
            AND vm.id_listado_vac_mov=${idListadoVacMov}
            ORDER BY vm.id_vacante_mov ASC`);

        console.log('que trae result getAllVacantesMov: ', result);

        res.status(200).json(result);
        
    }catch(error){
        res.status(400).send(error.message);
    }

};