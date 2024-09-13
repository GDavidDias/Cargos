import { useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';

//-------ICONOS--------
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchVacantesDispMov } from "../../utils/fetchVacanteDispMov";
import { SiMicrosoftexcel } from "react-icons/si";

const Listados = () => {

    const componentRef = useRef(null);
    const navigate = useNavigate();
    //EstadosGlogales
    const configSG = useSelector((state)=> state.config);
    const userSG = useSelector((state)=> state.user);

    //E.L guardo el id del listado de vacantes
    const[idListVacMov,setIdListVacMov]=useState();
    
    const[listado, setlistado]=useState([]);
    const[listadoFormat, setlistadoFormat]=useState([]);

    const[reporte, setReporte]=useState('');


    const logOut = () =>{
        navigate('/')
    };

    //Proc: traigo el ID del listado de Vacantes Configurado
    const buscoIDListadoVacantes = async(id_nivel) =>{
        //Filtro configuracion para el nivel
        const configFilterNivel = await configSG.config.filter((configNivel)=>configNivel.id_nivel==id_nivel);
        console.log('que trae configFilterNivel: ', configFilterNivel);

        //Traigo el id del listado cargado en configuracion para:
        //LISTADO DE VACANTES DE MOVIMIENTOS -> id_listado_vacantes_mov
        const idFilterListado = configFilterNivel[0]?.id_listado_vacantes_mov;
        console.log('que tiene idFilterListado: ',idFilterListado);

        //Guardo id_listado_vacantes_mov para usarlo en nueva Vacante
        setIdListVacMov(idFilterListado);
    };

    const submitVacDisponibles= async()=>{
        console.log('presiono vacantes disponibles')
        //traigo datos y guardo en store local
        //LLAMO AL PROCEDIMIENTO PARA TRAER EL LISTADO DE VACANTES
        const data = await fetchVacantesDispMov(idListVacMov);
        console.log('que trae data de fetchVacantesDispMov: ', data);
        if(data.length!=0){
            setlistado(data);
        }
    };

    const submitAsignacionesRealizadas=()=>{
        console.log('presiono asignaciones realizadas')
        //traigo datos y guardo en store local
        setlistado([])
    };

    const handlePrint = useReactToPrint({
        content:() => componentRef.current,
        pageStyle:`
        @page {
          size: legal landscape; /* Tamaño del papel */
          orientation: landscape; /* Orientación horizontal */
        }
        @media print {
            table {
                page-break-inside: auto;
            }
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
        }
      `
    }); 

    
    // Función para exportar la tabla a un archivo Excel
    const handleExportToExcel = () => {
        // Crea una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(formateaListado(listado));
        const workbook = XLSX.utils.book_new();
    
        // Agrega la hoja de cálculo al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    
        // Genera el archivo Excel y descarga
        XLSX.writeFile(workbook, "Vacantes_Disponibles.xlsx");
    }; 

    function formateaListado (datos){
        // const datosformat = datos.map(({orden, cargo, cupof, establecimiento, obs_establecimiento, turno, modalidad, region, departamento, localidad, zona, resolucion})=>({
        //     orden, cargo, cupof, establecimiento, obs_establecimiento, turno, modalidad, region, departamento, localidad, zona, resolucion
        // }));
        const datosformat = datos.map(objeto=>({
            'Orden':objeto.orden, 
            'Cargo':objeto.cargo, 
            'Cupof':objeto.cupof, 
            'N° Escuela': objeto.establecimiento, 
            'Nombre Escuela':objeto.obs_establecimiento, 
            'Turno':objeto.turno, 
            'Modalidad':objeto.modalidad, 
            'Region':objeto.region, 
            'Departamento':objeto.departamento, 
            'Localidad':objeto.localidad, 
            'Zona':objeto.zona, 
            'Resolucion':objeto.resolucion
        }));
        return datosformat;
    };

    useEffect(()=>{

        if(reporte==='asignacionesRealizadas'){
            submitAsignacionesRealizadas();
        }else if(reporte==='vacantesDisponibles'){
            submitVacDisponibles();
        }
    },[reporte])


    useEffect(()=>{
        //?PROCESO SE EJECUTA EN CARGA INICIAL
        //LLAMO AL PROCEDIMIENTO buscoIDListadoVacantes Y PASO EL NIVEL CARGADO EN STORE GLOBAL
        buscoIDListadoVacantes(configSG.nivel.id_nivel);

    },[])

    return(
        <div className="notranslate">
            {/* ENCABEZADO PAGINA */}
            <div className="bg-[#C9D991] h-[8vh] flex flex-row ">
                {/* TITULOS - BOTONES - NIVEL */}
                <div className="w-[55vw] flex justify-center items-start flex-col">
                    <label className="ml-4 text-base font-semibold">NIVEL {configSG.nivel.descripcion}</label>
                    <div className="flex flex-row">
                        <label className="ml-4 text-lg font-sans font-bold">LISTADOS Y REPORTES</label>
                    </div>
                </div>
                {/* SECCION DATOS USUARIO */}
                <div className=" w-[30vw] flex items-center justify-end">
                    <label className="mr-2 italic text-sm">{userSG.nombre}</label>
                    <FaRegUserCircle className="mr-2 text-2xl text-[#73685F] " />
                    <FaPowerOff 
                        className="mr-4 text-2xl text-[#73685F] hover:cursor-pointer hover:text-[#7C8EA6] transition-transform duration-500 transform hover:scale-125"
                        title="Salir"
                        onClick={()=>logOut()}
                    />
                </div>
            </div>

            {/* CONTENIDO DE PAGINA - ENCABEZADO */}
            <div className="h-[6vh] border-b-2 border-zinc-400 py-2 shadow-md flex flex-row justify-between">
                <div className=" flex flex-row">
                    <button 
                        className={`ml-2 px-[2px] border-[1px] border-[#73685F] rounded hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] shadow
                            ${(reporte==='asignacionesRealizadas')
                                ?`bg-[#7C8EA6] text-white border-[#7C8EA6]`
                                :``
                            }
                            `}
                        onClick={()=>setReporte('asignacionesRealizadas')}
                    >Asignaciones Realizadas</button>
                    <button 
                        className={`ml-2 px-[2px] border-[1px] border-[#73685F] rounded hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] shadow
                            ${(reporte==='vacantesDisponibles')
                                ?`bg-[#7C8EA6] text-white border-[#7C8EA6]`
                                :``
                            }
                            `}
                        onClick={()=>setReporte('vacantesDisponibles')}
                    >Vacantes Disponibles</button>
                </div>
                <div className="flex flex-row mr-4">
                    {/* <button
                        className="ml-2 px-[2px] border-[1px] border-[#73685F] rounded hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6] shadow"
                        onClick={handlePrint}
                    >Imprimir</button> */}
                    <button
                        className={`ml-2 px-[2px] border-[1px] border-[#73685F] rounded   shadow
                            ${(listado.length!=0)
                                ?`hover:bg-[#7C8EA6] hover:text-white hover:border-[#7C8EA6]`
                                :`bg-gray-300 text-white border-gray-300`
                            }
                            `}
                        disabled={listado.length===0}
                        onClick={handleExportToExcel}
                    ><SiMicrosoftexcel/></button>
                </div>
            </div>

            {/* CONTENIDO DE PAGINA - DATOS */}
            <div 
                className="h-[79vh] overflow-y-auto "
                ref={componentRef}
            >
                <table className="border-[1px] bg-slate-50 w-full page-break-after border">
                    <thead>
                        <tr className="sticky top-0 text-sm border-b-[1px] border-gray-500 bg-zinc-200">
                            <th className="border-x-[1px] border-gray-500">Orden</th>
                            <th className="border-x-[1px] border-gray-500">Cargo</th>
                            <th className="border-x-[1px] border-gray-500">Cupof</th>
                            <th className="border-x-[1px] border-gray-500">N°Escuela</th>
                            <th className="border-x-[1px] border-gray-500">Nombre Escuela</th>
                            <th className="border-x-[1px] border-gray-500">Turno</th>
                            <th className="border-x-[1px] border-gray-500">Modalidad</th>
                            <th className="border-x-[1px] border-gray-500">Region</th>
                            <th className="border-x-[1px] border-gray-500">Departamento</th>
                            <th className="border-x-[1px] border-gray-500">Localidad</th>
                            <th className="border-x-[1px] border-gray-500">Zona</th>
                            <th className="border-x-[1px] border-gray-500">Resolucion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listado?.map((item,index)=>(
                                <tr key={index} className="border-[1px] border-gray-500 bg-white text-sm text-center break-inside-avoid">
                                    <td className="border-x-[1px] border-gray-500">{item.orden}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.cargo}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.cupof}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.establecimiento}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.obs_establecimiento}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.turno}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.modalidad}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.region}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.departamento}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.localidad}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.zona}</td>
                                    <td className="border-x-[1px] border-gray-500">{item.resolucion}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Listados;