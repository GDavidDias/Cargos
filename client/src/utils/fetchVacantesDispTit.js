import axios from 'axios';
import { URL } from '../../varGlobal';


export const fetchVacantesDispTit = async(id_listado,limit,page,valorBusqueda,filtroEspecialidad,orderBy,typeOrder,inputFiltroRegionVac) => {
    const dataBody={
        "idListadoVacTit":id_listado,
        "limit":limit,
        "page":page,
        "filtroAsignacion":'disponibles',
        "filtroEspecialidad":filtroEspecialidad,
        "filtroBusqueda":valorBusqueda,
        "filtroRegion":inputFiltroRegionVac,
        //"filtroModalidad":filtroModalidad
    };
    console.log('que tiene datos que pasa a body en fetchvacantes: ', dataBody);

    try{
        const {data} = await axios.post(`${URL}/api/allvacantestit`,dataBody);
        console.log('que trae data de fetchVacantesDispTit: ', data);
        return data;

    }catch(error){
        console.log('error en fetchVacantesDispTit: ', error.message);
    }
};