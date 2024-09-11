import { useSelector } from "react-redux";

//-------ICONOS--------
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Listados = () => {
    const navigate = useNavigate();
    //EstadosGlogales
    const configSG = useSelector((state)=> state.config);
    const userSG = useSelector((state)=> state.user);
    
    const[listado, setlistado]=useState([]);


    const logOut = () =>{
        navigate('/')
    };

    const submitVacDisponibles=()=>{
        //presiona en vacantes disponibles

    };

    const submitVacAsignadas=()=>{
        //presiona en vacantes asignadas

    };
    useEffect(()=>{
        //Al renderizar los datos.

    },[])

    return(
        <div>
            {/* ENCABEZADO PAGINA */}
            <div className="bg-[#C9D991] h-[8vh] flex flex-row">
                {/* TITULOS - BOTONES - NIVEL */}
                <div className="w-[45vw] flex justify-center items-start flex-col">
                    <label className="ml-4 text-base font-semibold">NIVEL {configSG.nivel.descripcion}</label>
                    <div className="flex flex-row">
                        <label className="ml-4 text-lg font-sans font-bold">LISTADOS Y REPORTES</label>
                        <button 
                            className="ml-2 px-[2px] border-[1px] border-[#73685F] rounded hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] shadow"
                            onClick={submitVacDisponibles}
                        >Vacantes Disponibles</button>
                        <button 
                            className="ml-2 px-[2px] border-[1px] border-[#73685F] rounded hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] shadow"
                            onClick={submitVacAsignadas}
                        >Vacantes Asignadas</button>
                    </div>
                </div>
                {/* SECCION DATOS USUARIO */}
                <div className=" w-[40vw] flex items-center justify-end">
                    <label className="mr-2 italic text-sm">{userSG.nombre}</label>
                    <FaRegUserCircle className="mr-2 text-2xl text-[#73685F] " />
                    <FaPowerOff 
                        className="mr-4 text-2xl text-[#73685F] hover:cursor-pointer hover:text-[#7C8EA6] transition-transform duration-500 transform hover:scale-125"
                        title="Salir"
                        onClick={()=>logOut()}
                    />
                </div>
            </div>

            {/* CONTENIDO DE PAGINA - SECCION DATOS */}
            <div className="h-">

            </div>
        </div>
    )
};

export default Listados;