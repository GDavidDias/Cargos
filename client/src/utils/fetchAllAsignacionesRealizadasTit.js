import axios from 'axios';
import { URL } from '../../varGlobal';


export const fetchAllAsignacionesRealizadasTit = async(id_listado) => {
    const dataBody={
        "idListadoVacTit":id_listado,
        "limit": 99999,
        "page": 1
    };
    console.log('que tiene datos que pasa a body en fetchAllAsignacionesRealizadasTit: ', dataBody);

    try{
        const {data} = await axios.post(`${URL}/api/asignacionesrealizadastit`,dataBody);
        console.log('que trae data de fetchAllAsignacionesRealizadasTit: ', data);
        return data;
        
    }catch(error){
        console.log('error en fetchAllAsignacionesRealizadasTit: ', error.message);
    }
};