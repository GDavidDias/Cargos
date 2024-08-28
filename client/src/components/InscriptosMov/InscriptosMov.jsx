import { useEffect, useState } from "react";
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useSelector } from "react-redux";
import { fetchAllInscriptosMov } from "../../utils/fetchAllInscriptosMov";
import { useNavigate } from "react-router-dom";
import { FaDotCircle, FaSearch, FaEye, FaTimes} from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";

const InscriptosMov = ()=>{
    const configSG = useSelector((state)=>state.config);
    const navigate = useNavigate();

    //PARA PODER FILTRAR LOS LISTADOS SE DETERMINA QUE 
    // disponibilidad -> 1
    // activos -> 2
    const[tipoInscripto, setTipoInscripto]=useState(2);
    const[listadoInscriptosMov, setListadoInscriptosMov]=useState([]);
    const[filterListadoInscriptosMov, setFilterListadoInscriptosMov]=useState([]);

    const logOut = () =>{
        navigate('/')
    };


    //ESTE PROCEDIMIENTO CARGA EL LISTADO INSCRIPTOS MOV AL ESTADO LOCAL
    const getInscriptosMov = async(id_listado) =>{
        let data;
        console.log('que trae id_listado getInscriptosMovListado: ', id_listado);
        if(id_listado){
            data = await fetchAllInscriptosMov(id_listado);
            console.log('que trae data de fetchAllInscriptosMov: ', data);

            if(data?.length!=0){
                setListadoInscriptosMov(data); 
            };
        };
    };    


    //ESTE PROCEDIMIENTO TRAE EL ID DEL LISTADO CONFIGURADO
    const buscoIdlistadoInscrip = async(id_nivel) =>{
        //Filtro configuracion para el nivel
        const configFilterNivel = await configSG.config.filter((configNivel)=>configNivel.id_nivel==id_nivel);
        console.log('que trae configFilterNivel: ', configFilterNivel);

        //Traigo el id_listado cargado en configuracion para:
        //LISTADO DE INSCRIPTOS DE MOVIMIENTOS -> id_listado_inscriptos_mov
        const idFilterListado = configFilterNivel[0].id_listado_inscriptos_mov;
        console.log('que tiene idFilterListado: ',idFilterListado);

        //LLAMO AL PROCEDIMIENTO PARA TRAER EL LISTADO
        await getInscriptosMov(idFilterListado);

    };

    const filtroListado = (tipoIns) =>{
        let listadoFiltrado=[];
        if(tipoIns===1){
            listadoFiltrado = listadoInscriptosMov.filter((inscriptos)=>inscriptos.id_tipo_inscripto===1);
        }else{
            listadoFiltrado = listadoInscriptosMov.filter((inscriptos)=>inscriptos.id_tipo_inscripto!=1);
        }

        setFilterListadoInscriptosMov(listadoFiltrado);
    };

    useEffect(()=>{
        console.log('como queda el listado filtrado filterListadoInscriptosMov: ', filterListadoInscriptosMov);
    },[filterListadoInscriptosMov])

    useEffect(()=>{
        console.log('que tiene estado local tipoInscripto: ', tipoInscripto);
        //FILTRO EL LISTADO DE INSCRIPTOS DE MOVIMIENTO
        filtroListado(tipoInscripto);
    },[tipoInscripto])

    //VEO EL LISTADO DE INSCRIPTOS DE MOVIMIENTO
    useEffect(()=>{
        console.log('que tiene listadoInscriptosMov: ', listadoInscriptosMov);
        //NI BIEN CARGO EL LISTADO DE INSCRIPTOS FILTRO CON ESTADO ACTIVO
        //FILTRO EL LISTADO DE INSCRIPTOS DE MOVIMIENTO
        filtroListado(tipoInscripto);
    },[listadoInscriptosMov])

    //VEO LA CONFIGURACION GLOBAL
    useEffect(()=>{
        console.log('que tiene configSG en InscriptosMov: ', configSG);
    },[configSG])


    //AL INGRESAR SE CARGA EL LISTADO DE INSCRIPTOS
    useEffect(()=>{
        //LLAMO AL PROCEDIMIENTO buscoIdlistadoInscrip Y PASO EL NIVEL CARGADO EN STORE GLOBAL
        console.log('que listado configurado del nivel trae: ',buscoIdlistadoInscrip(configSG.nivel.id_nivel));

    },[]);

    return(
        <div className="h-full w-full">
            {/* ENCABEZADO DE PAGINA */}
            <div className="bg-[#C9D991] h-[8vh] flex flex-row">
                {/* TITULOS - BOTONES - NIVEL */}
                <div className="w-[45vw] flex justify-center items-start flex-col">
                    <label className="ml-4 text-base font-semibold">NIVEL {configSG.nivel.descripcion}</label>
                    <div className="flex flex-row">
                        <label className="ml-4 text-lg font-sans font-bold">INSCRIPTOS - Luom</label>
                        <button 
                            className={`ml-2 px-[2px] border-[1px] rounded shadow 
                                ${(tipoInscripto===2)
                                    ?`border-[#7C8EA6] bg-[#7C8EA6] text-white`
                                    :`border-[#73685F]  hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] `
                                }`}
                            onClick={()=>setTipoInscripto(2)}
                        >Activos</button>
                        <button 
                            className={`ml-2 px-[2px] border-[1px] rounded shadow 
                                ${(tipoInscripto===1)
                                    ?`border-[#7C8EA6] bg-[#7C8EA6] text-white`
                                    :`border-[#73685F]  hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] `
                                }`}
                            onClick={()=>setTipoInscripto(1)}
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
                        onClick={()=>logOut()}
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
                        <table className="border-[1px] bg-slate-50 w-full">
                            <thead>
                                <tr className="text-sm border-b-[1px] border-zinc-300">
                                    <th className="border-r-[1px] border-zinc-300">Orden</th>
                                    <th className="border-r-[1px] border-zinc-300">Puntaje</th>
                                    <th className="border-r-[1px] border-zinc-300">Apellido</th>
                                    <th className="border-r-[1px] border-zinc-300">Nombre</th>
                                    <th className="border-r-[1px] border-zinc-300">DNI</th>
                                    <th className="border-r-[1px] border-zinc-300">Escuela</th>
                                    <th className="border-r-[1px] border-zinc-300">Cargo Actual</th>
                                    <th className="border-r-[1px] border-zinc-300">Cargo Solicitado</th>
                                    <th className="border-r-[1px] border-zinc-300">Observacion</th>
                                    <th className="border-r-[1px] border-zinc-300">Estado</th>
                                    <th className="">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterListadoInscriptosMov?.map((inscripto, index)=>{
                                        return(
                                            <tr 
                                                className="text-lg font-medium border-b-[1px] border-zinc-300 h-[5vh] hover:bg-orange-300"
                                                key={index}
                                            >
                                                <td className="text-center">{inscripto.orden}</td>
                                                <td className="text-center">{inscripto.total}</td>
                                                <td>{inscripto.apellido}</td>
                                                <td>{inscripto.nombre}</td>
                                                <td>{inscripto.dni}</td>
                                                <td>{inscripto.nro_escuela}</td>
                                                <td className="text-center">{inscripto.cargo_actual}</td>
                                                <td className="text-center">{inscripto.cargo_solicitado}</td>
                                                <td className="text-sm">{inscripto.observacion}</td>
                                                <td></td>
                                                <td>
                                                    <div className="flex flex-row items-center justify-between mx-2">
                                                        <FaEye className="hover:cursor-pointer hover:text-[#83F272]" title="Ver Datos"/>
                                                        <BiTransferAlt className="text-2xl hover:cursor-pointer hover:text-[#83F272]" title="Asignacion"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InscriptosMov;