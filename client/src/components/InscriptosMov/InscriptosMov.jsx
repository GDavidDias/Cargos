import { useEffect } from "react";
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useSelector } from "react-redux";

const InscriptosMov = ()=>{
    const nivelSG = useSelector((state)=>state.page.nivel);

    useEffect(()=>{
        console.log('que tiene nivelSG en InscriptosMov: ', nivelSG);
    },[nivelSG])

    return(
        <div className="h-full w-full">
            {/* ENCABEZADO DE PAGINA */}
            <div className="bg-[#C9D991] h-[8vh] flex flex-row">
                {/* TITULOS - BOTONES - NIVEL */}
                <div className="w-[45vw] flex justify-center items-start flex-col">
                    <label className="ml-4 text-base font-semibold">NIVEL {nivelSG}</label>
                    <div className="flex flex-row">
                        <label className="ml-4 text-lg font-sans font-bold">INSCRIPTOS - Luom</label>
                        <button 
                            className="ml-2 px-[2px] border-[1px] border-[#73685F] rounded hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] shadow"
                        >Activos</button>
                        <button 
                            className="ml-2 px-[2px] border-[1px] border-[#73685F] rounded hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] shadow"
                        >Disponibilidad</button>
                    </div>
                </div>
                {/* SECCION DATOS USUARIO */}
                <div className="border-2 border-sky-500 w-[40vw] flex items-center justify-end">
                    <label className="mr-2 italic text-sm">Usuario Logueado</label>
                    <FaRegUserCircle className="mr-2 text-2xl text-[#73685F] " />
                    <FaPowerOff 
                        className="mr-4 text-2xl text-[#73685F] hover:cursor-pointer hover:text-[#7C8EA6] transition-transform duration-500 transform hover:scale-125"
                        title="Salir"
                        // onClick={()=>logout()}
                    />
                </div>
            </div>
            {/* CONTENIDO DE PAGINA */}
            <div className="h-[87vh]">
                <div className="m-2 border-[1px] border-[#758C51] rounded h-[83vh]">
                    {/* PARTE SUPERIOR DE TABLA */}
                    <div className="border-b-[1px] border-slate-300 h-[6vh]">
                        
                    </div>

                    {/* PARTE INFERIOR DE DATOS DE TABLA */}
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default InscriptosMov;