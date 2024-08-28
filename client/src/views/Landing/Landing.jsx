import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfig } from "../../utils/fetchConfig";
import { setConfig, setNivel } from "../../redux/configSlice";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const configSG = useSelector((state)=>state.config);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitNivelInicial = () =>{
        console.log('Presiono Nivel Inicial');
        const datosNivel=[{id_nivel:1, descripcion:'INICIAL'}];
        dispatch(setNivel(datosNivel));
        navigate('/home');
    };

    const submitNivelPrimario = ()=>{
        console.log('Presiono Nivel Primario');
        const datosNivel=[{id_nivel:2, descripcion:'PRIMARIO'}];
        dispatch(setNivel(datosNivel));
        navigate('/home');
    };

    const getConfiguracion = async() =>{
        const data = await fetchConfig();
        console.log('que trae configuracion: ', data);
        dispatch(setConfig(data));
    };

    useEffect(()=>{
        console.log('que tiene configSG: ', configSG);
    },[configSG])
        
    useEffect(()=>{ 
        //Se carga la tabla de configuracion
        getConfiguracion()
    },[])

    return(
        <div>
            <div>
                <label>Landing Page</label>
            </div>
            {/* SELECCION NIVEL */}
            <div className="ml-2 mt-6 text-base flex flex-col border-2 border-orange-500">
                <label>temporalmente seleccionar nivel al loguearse</label>
                <button 
                    className="border-[1px] m-2 rounded"
                    onClick={()=>submitNivelInicial()}
                >Inicial</button>
                <button 
                    className="border-[1px]  m-2 rounded"
                    onClick={()=>submitNivelPrimario()}
                >Primario</button>
            </div>
        </div>
    )
};

export default Landing;