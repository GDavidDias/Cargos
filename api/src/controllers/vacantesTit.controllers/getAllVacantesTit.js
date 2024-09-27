const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //TRAE TODAS LAS VACANTES DE TITULARIZACION SEGUN EL NIVEL INDICADO EN EL LISTADO_VAC_TIT
    const{idListadoVacTit,limit,page,filtroAsignacion,filtroEspecialidad,filtroBusqueda} = req.body;
    console.log('que trae idListadoVacTit: ', idListadoVacTit);
    console.log('que trae limit: ', limit);
    console.log('que trae page: ', page);
    console.log('que trae filtroAsignacion: ', filtroAsignacion);
    console.log('que trae filtroEspecialidad: ', filtroEspecialidad);
    console.log('que trae filtroBusqueda: ', filtroBusqueda);

    const offset = (page-1)*limit;

    let armaquery=`SELECT vt.id_vacante_tit, vt.id_listado_vac_tit, vt.orden, vt.nro_establecimiento, vt.nombre_establecimiento, vt.region, vt.departamento, vt.localidad, vt.cargo, vt.turno, vt.modalidad, vt.cupof, vt.id_especialidad, vt.datetime_creacion, vt.obs_desactiva, vt.zona, vt.resolucion, at2.datetime_asignacion , at2.id_estado_asignacion
            FROM vacantes_tit AS vt
            LEFT JOIN (SELECT at.id_vacante_tit, at.datetime_asignacion , at.id_estado_asignacion FROM asignacion_tit AS at WHERE at.obs_desactiva IS NULL) AS at2 ON vt.id_vacante_tit = at2.id_vacante_tit
            WHERE (vt.obs_desactiva IS NULL OR vt.obs_desactiva = "")
            AND vt.id_listado_vac_tit=${idListadoVacTit}
            `;
    
    if(filtroEspecialidad && filtroEspecialidad!=''){
        armaquery += ` AND vt.id_especialidad IN(${filtroEspecialidad}) `
    };
    
    if(filtroAsignacion==='asignadas'){
        armaquery+=` AND at2.datetime_asignacion IS NOT NULL`;
    }else if(filtroAsignacion==='disponibles'){
        armaquery+=` AND at2.datetime_asignacion IS NULL`;
    };

    if(filtroBusqueda && filtroBusqueda!=''){
        armaquery+=` AND (LOWER(vt.nro_establecimiento) LIKE '%${filtroBusqueda.toLowerCase()}%' 
                            OR LOWER(vt.nombre_establecimiento) LIKE '%${filtroBusqueda.toLowerCase()}%' 
                            OR LOWER(vt.departamento) LIKE '%${filtroBusqueda.toLowerCase()}%' 
                            OR LOWER(vt.localidad) LIKE '%${filtroBusqueda.toLowerCase()}%' 
                            OR LOWER(vt.cargo) LIKE '%${filtroBusqueda.toLowerCase()}%' 
                            OR LOWER(vt.modalidad) LIKE '%${filtroBusqueda.toLowerCase()}%' 
                    ) `
    }

    armaquery+= ` ORDER BY vt.id_vacante_tit ASC`

    try{

        const [result] = await pool.query(`${armaquery} LIMIT ${limit} OFFSET ${offset}`);

        console.log('que trae result getAllVacantesTit: ', result);

        const [totalRows]= await pool.query(`SELECT COUNT(*) AS count FROM (${armaquery}) AS vacantes`)

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