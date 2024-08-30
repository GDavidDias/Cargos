import axios from 'axios';
import { URL } from '../../varGlobal';


export const fetchVacantesDispMov = async(id_listado) => {
    const dataBody={
        "idListadoVacMov":id_listado
    };
    //console.log('que tiene datos que pasa a body en fetchVacantesDispMov: ', dataBody);

    try{
        const {data} = await axios.post(`${URL}/api/vacantesdisp`,dataBody);
        //console.log('que trae data de fetchVacantesDispMov: ', data);
        return data;
        
    }catch(error){
        console.log('error en fetchVacantesDispMov: ', error.message);
    }
};