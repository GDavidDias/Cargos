import axios from 'axios';
import { URL } from '../../varGlobal';


export const fetchAllInscriptosMov = async() => {
    try{
        const {data} = await axios.get(`${URL}/api/inscriptosmov`);
        console.log('que trae data de fetchAllInscriptosMov: ', data);
        return data;
    }catch(error){
        console.log('error en fetchAllInscriptosMov: ', error.message);
    };
};