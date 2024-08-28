import axios from 'axios';
import { URL } from '../../varGlobal';


export const fetchAllInscriptosMov = async(id_listado) => {
    const dataBody={
        "id_listado_inscriptos":id_listado
    };
    console.log('que tiene datos que pasa a body en fetchAllInscriptosMov: ', dataBody);

    try{
        const {data} = await axios.post(`${URL}/api/inscriptosmov`,dataBody);
        console.log('que trae data de fetchAllInscriptosMov: ', data);
        return data;
        
    }catch(error){
        console.log('error en fetchAllInscriptosMov: ', error.message);
    }
};