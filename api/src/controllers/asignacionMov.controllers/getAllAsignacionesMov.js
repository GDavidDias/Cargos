const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //TRAE TODAS LAS DESIGNACIONES REALIZADAS EN LA TABLA asignacion_mov
    const {limit,page} = req.body;
    console.log('que trae limit: ', limit);
    console.log('que trae page: ', page);

    const offset = (page-1)*limit;

// +------------------------+--------------+------+-----+---------+----------------+
// | Field                  | Type         | Null | Key | Default | Extra          |
// +------------------------+--------------+------+-----+---------+----------------+
// | id_asignacion_mov      | int          | NO   | PRI | NULL    | auto_increment |
// | id_vacante_mov         | int          | YES  |     | NULL    |                |
// | id_inscripto_mov       | int          | YES  |     | NULL    |                |
// | datetime_asignacion    | datetime     | YES  |     | NULL    |                |
// | id_estado_asignacion   | int          | YES  |     | NULL    |                |
// | observaciones          | varchar(250) | YES  |     | NULL    |                |
// | datetime_actualizacion | datetime     | YES  |     | NULL    |                |
// +------------------------+--------------+------+-----+---------+----------------+

    let armaquery=`
    SELECT am.id_asignacion_mov, am.id_vacante_mov, am.id_inscripto_mov, am.datetime_asignacion, im.apellido, im.nombre, im.dni, im.total, im.nro_escuela as escuela_origen, im.obs_escuela as obs_escuela_origen, im.cargo_actual, im.turno_actual,  vm.cargo as cargo_destino, vm.turno as turno_destino, vm.establecimiento as establecimiento_destino, vm.obs_establecimiento as obs_establecimiento_destino, vm.modalidad as modalidad_destino, vm.cupof, vm.region as region_destino, vm.localidad as localidad_destino, vm.zona as zona_destino
            FROM asignacion_mov AS am
            LEFT JOIN inscriptos_mov AS im ON am.id_inscripto_mov = im.id_inscriptos_mov
            LEFT JOIN vacantes_mov AS vm ON am.id_vacante_mov = vm.id_vacante_mov
            wHERE am.id_estado_asignacion = 1
            AND am.obs_desactiva IS NULL
            ORDER BY am.datetime_asignacion DESC
    `;
    
    try{
        console.log('como va el armaquery en getAllAsignacionesMov: ', armaquery);
        const [result] = await pool.query(`${armaquery} LIMIT ${limit} OFFSET ${offset}`);

        //console.log('que trae result getAllAsignacionesMov: ', result);

        const [totalRows]= await pool.query(`SELECT COUNT(*) AS count FROM (${armaquery}) AS inscriptos`);

        const totalPages= Math.ceil(totalRows[0]?.count/limit);
        const totalItems=totalRows[0]?.count;

        res.status(200).json({
            result:result,
            paginacion:{
                page:page,
                limit:limit,
                totalPages:totalPages,
                totalItems:totalItems
            }

        });
        
    }catch(error){
        res.status(400).send(error.message);
    }

};