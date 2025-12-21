import axios from 'axios';
import { URL } from '../../varGlobal';


export const fetchEstadoMovNulos = async(id_listado,idTitular,tipoInscripto) => {
    const dataBody={
        "idListadoVacTit":id_listado,
        "idTitular":idTitular,
        "tipoInscripto":tipoInscripto
    };
    console.log('que tiene datos que pasa a body en fetchEstadoMovNulos: ', dataBody);

    try{
        const {data} = await axios.post(`${URL}/api/estadoNulo`,dataBody);
        console.log('que trae data de fetchEstadoMovNulos: ', data);
        return data;

    }catch(error){
        console.log('error en fetchEstadoMovNulos: ', error.message);
    }
};