const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    //DESACTIVA UNA VACANTE AL ASIGNAR UNA OBSERVACION, 
    //EDITA UNA VACANTE EN SU CAMPO obs_desactiva
    const {id_listado, idTitular} = req.body;
    console.log('que tiene id_listado: ', id_listado);
    console.log('que tiene idTitular: ', idTitular);

    try{
        //TRAE LAS VACANTES QUE NO TENGAN UNA FECHA DE ASIGNACION, SON LAS DISPONIBLES
        //WHERE am.datetime_asignacion IS NULL 
        //DESPUES VER SI SE IMPLEMENTA EL ESTADO DE ASIGNACION, SOLO TRAER COMO DISPONIBLES UNA SIGNACION RECHAZADA, YA QUE LAS ACEPTADAS ESTAN ASIGNADAS O LAS PENDIENTES ESTAN EN PROCESO DE ASIGNACION.

        let armaquery=`SELECT EXISTS(
                    SELECT 1
                    FROM inscriptos_tit im
                    WHERE im.id_listado_inscriptos = ${id_listado} 
                    AND im.orden < (
                        SELECT orden
                        FROM inscriptos_tit
                        WHERE id_listado_inscriptos = ${id_listado} 
                        AND id_inscriptos_tit = ${idTitular}
                        
                        LIMIT 1
                    )
                    AND im.id_estado_inscripto  IS NULL
                    
                ) AS hay_nulos
            `;

        console.log('como va el armaquery en getHayNulosTit: ', armaquery);
        const [result] = await pool.query(armaquery);

        console.log('que trae result getHayNulosTit: ', result);
        res.status(200).json(result);        
        
    }catch(error){
        res.status(400).send(error.message);
    }

};