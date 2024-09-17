import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { outUser } from "../../redux/userSlice";

const InscriptosTit = () =>{
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //E.G que trae la configuracion de sistema
    const configSG = useSelector((state)=>state.config);
    const userSG = useSelector((state)=>state.user);

    //-------------------------------------
    //      PROCEDIMIENTOS Y FUNCIONES
    //-------------------------------------

    const logOut = () =>{
        dispatch(outUser());
        navigate('/')
    };
    
    return(
        <div className="notranslate h-full w-full">
            {/* ENCABEZADO PAGINA */}
            <div className="bg-[#C9D991] h-[12vh] flex flex-row">
                {/* TITULOS - NIVEL */}
                <div className="w-[45vw] flex justify-center items-start flex-col">
                    <label className="ml-4 text-base font-semibold">NIVEL {configSG.nivel.descripcion}</label>
                    <div className="flex flex-row">
                        <label className="ml-4 text-lg font-sans font-bold">INSCRIPTOS - LUOM</label>
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
            
        </div>
    )
};

export default InscriptosTit;