import axios from 'axios';
import { URL } from '../../varGlobal';


export const fetchAllVacantesMov = async(id_listado) => {
    const dataBody={
        "idListadoVacMov":id_listado
    };
    //console.log('que tiene datos que pasa a body en fetchAllVacantesMov: ', dataBody);

    try{
        const {data} = await axios.post(`${URL}/api/allvacantesmov`,dataBody);
        //console.log('que trae data de fetchAllVacantesMov: ', data);
        return data;
        
    }catch(error){
        console.log('error en fetchAllVacantesMov: ', error.message);
    }
};