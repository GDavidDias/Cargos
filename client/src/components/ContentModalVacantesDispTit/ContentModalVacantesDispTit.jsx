import { BiTransferAlt } from "react-icons/bi";
import { TbSortAscending , TbSortDescending } from "react-icons/tb";
import Paginador from "../Paginador/Paginador";
import { FaDotCircle, FaSearch, FaEye, FaTimes, FaEdit} from "react-icons/fa";

const ContentModalVacantesDispTit = ({datosInscriptoSelect,submitCloseModalVac,listadoVacantesDispTit,currentPageVac,paginacionVac,handlePageChangeVac,inputSearchVac,handleInputSearchVacChange,submitVerAsignacion, listadoEspecialidades, filtroEspecialidadVac, handleSelectFiltroEspecialidadVac, handleCancelFiltroEspecialidadVac, estadoAsignadoInscripto, setEstadoAsignadoInscripto, HandleSelectEstadoAsignadoInscripto, submitGuardarEstadoInscripto}) =>{
    return(
        <div className="notranslate h-100 w-100 flex flex-col items-center">
            <label 
                className="text-2xl text-center font-bold flex flex-row items-center m-2" 
                translate='no'
            >Vacantes Disponibles<p className="text-sm font-light ml-2"></p></label>
            {/* DATOS DEL INSCRIPTO */}
            <div className="flex justify-center  font-semibold text-2xl">
                <div className="border-[1px] border-zinc-300 rounded-md shadow ">
                    <label className="mx-4 text-zinc-500">Docente: {datosInscriptoSelect.apellido} {datosInscriptoSelect.nombre}</label>
                    {/* <label className="mr-4 text-red-400">Cargo Origen: {datosInscriptoSelect.cargo_actual}</label>
                    <label className="mr-4 text-sky-500">Cargo Solicitado: {datosInscriptoSelect.cargo_solicitado}</label> */}
                    <label className="mr-4 text-zinc-500">DNI: {datosInscriptoSelect.dni}</label>
                    <label className="mr-4 text-sky-500">Puntaje: {datosInscriptoSelect.total}</label>
                </div>
                <div className="ml-2 flex flex-row items-center">
                    <label className="text-lg desktop-xl:text-lg font-bold">Estado: </label>
                    <div className="ml-2 border-[1px] border-zinc-400  flex justify-center rounded-md shadow font-semibold text-base desktop-xl:text-lg">
                        <select 
                            className="focus:outline-none rounded-md"
                            value={estadoAsignadoInscripto}
                            onChange={HandleSelectEstadoAsignadoInscripto}
                        >
                            <option value='' disabled selected>Seleccione...</option>
                            <option value={2}>No Asignado</option>
                            <option value={4}>Ausente</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="h-[60vh] w-[90vw] mt-2 ">
                {/* DATOS DE VACANTES */}
                {/* PARTE SUPERIOR-FILTROS Y BUSQUEDA */}
                <div className="border-[1px] border-zinc-400 rounded-t-lg h-[14vh] flex flex-col bg-[#dde8b7]">
                    <div className="flex flex-row justify-between">
                        {/* FILTRO ESPECIALIDAD */}
                        <div className="flex flex-row my-[4px]">
                            <label className="mx-4 text-base desktop-xl:text-lg ">Especialidad: </label>
                            <div className="border-[1px] h-[26px] rounded border-zinc-400 bg-neutral-50 desktop-xl:h-[30px]">
                                <select
                                    className="w-[40vw] h-[24px] border-[1px] rounded focus:outline-none focus:ring-0 focus:border-none desktop-xl:text-lg "
                                    name="filtroEspecialidad"
                                    onChange={handleSelectFiltroEspecialidadVac}
                                    value={filtroEspecialidadVac}
                                >
                                    <option value='' selected disabled>Seleccione...</option>
                                    {
                                        listadoEspecialidades?.map((especialidad,index)=>(
                                            <option 
                                                key={index} 
                                                value={especialidad.id_especialidad}
                                                className="text-base"
                                            >{especialidad.abreviatura} - {especialidad.descripcion}</option>
                                        ))
                                    }
                                </select>
                                {(filtroEspecialidadVac!="") &&
                                    <label 
                                        className="font-bold mx-2 cursor-pointer"
                                        onClick={handleCancelFiltroEspecialidadVac}
                                    >X</label>
                                }
                            </div>
                        </div>

                        {/* CUADRO BUSQUEDA */}
                        <div className="flex justify-end my-[4px]">
                            <div className="border-[1px] border-zinc-400 w-[20vw] rounded flex flex-row items-center justify-between mr-2 bg-white">
                                <input 
                                    className="w-[15vw] focus:outline-none rounded pl-[2px]"
                                    placeholder="Buscar..."
                                    type="text"
                                    value={inputSearchVac}
                                    onChange={handleInputSearchVacChange}
                                />
                                <div className="flex flex-row items-center ">
                                    {(inputSearchVac!='') &&
                                        <FaTimes
                                            className="text-slate-400 cursor-pointer text-lg"
                                            onClick={()=>handleCancelSearchVac()}
                                        />
                                    }
                                    {/* <FaSearch 
                                        className="text-zinc-500 cursor-pointer mr-2"
                                        onClick={()=>submitSearchVac()}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ENCABEZADO DE CAMPOS  */}
                    <div className="flex flex-row text-lg">
                        <div className="flex flex-col items-center justify-end w-[2vw] border-r-[1px] border-zinc-200 hover:text-sky-500">
                            <label className="font-base">ID</label>
                        </div>
                        <div className="flex flex-col items-center justify-end w-[15vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">N° Establecimiento</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-col items-center justify-end w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Establecimiento</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-col items-center justify-end w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Especialidad</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-col items-center justify-end w-[10vw] border-r-[1px] border-zinc-200">
                            
                            <label className="font-semibold">Turno</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-col items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                            <select>
                                <option>I</option>
                                <option>II</option>
                                <option>III</option>
                                <option>IV</option>
                                <option>V</option>
                                <option>VI</option>
                                <option>VII</option>
                            </select>
                            <label className="font-semibold">Region</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-col items-center justify-end w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Departamento</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-col items-center justify-end w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Localidad</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-col items-center justify-center w-[8vw] ">
                            <select>
                                <option>J.S.</option>
                                <option>J.C.</option>
                                <option>A.A.</option>
                            </select>
                            <label className="font-semibold">Modalidad</label>
                        </div>
                        <div className="flex flex-col items-center justify-end w-[8vw] ">
                            <label className="font-semibold">Acciones</label>
                        </div>
                    </div>
                    
                </div>
                {/* PARTE INFERIOR - DATOS DE TABLA */}
                <div className="w-full h-[52vh] overflow-y-auto border-[1px] border-zinc-400 rounded-b-lg border-t-0">
                    <table className="">
                        <tbody>
                            { 
                                listadoVacantesDispTit?.map((vacante, index)=>{
                                    return(
                                        <tr
                                            className={`text-lg font-medium border-b-[1px] border-zinc-300 h-[5vh] hover:bg-orange-300 `}
                                                    key={index}
                                        >
                                            <td className="w-[2vw] pl-[8px] font-semibold text-sky-500">{vacante.id_vacante_tit
                                            }</td>
                                            <td className="w-[15vw] pl-[4px] text-center">{vacante.nro_establecimiento}</td>
                                            <td className="w-[10vw] pl-[4px] text-center">{vacante.nombre_establecimiento}</td>
                                            <td className="w-[10vw] pl-[4px] text-center">{vacante.cargo}</td>
                                            <td className="w-[10vw] pl-[4px] text-center">{vacante.turno}</td>
                                            <td className="w-[10vw] pl-[4px] text-center">{vacante.region}</td>
                                            <td className="w-[10vw] pl-[4px] text-center">{vacante.departamento}</td>
                                            <td className="w-[10vw] pl-[4px] text-center">{vacante.localidad}</td>
                                            <td className="w-[8vw] pl-[4px] text-center">{vacante.modalidad}</td>
                                            
                                            <td className="w-[8vw]">
                                                <div className="flex flex-row items-center justify-center">
                                                    {/* <FaEye 
                                                        className="mr-2 hover:cursor-pointer hover:text-[#83F272]" 
                                                        title="Ver Datos"
                                                        //onClick={()=>submitVerDatosInscripto(inscripto)}
                                                    /> */}
                                                    <BiTransferAlt 
                                                        className="text-2xl hover:cursor-pointer hover:text-[#83F272]"      title="Asignacion"
                                                        onClick={()=>submitVerAsignacion(vacante)}
                                                    />
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
            <div className="mt-4">
                <Paginador
                    currentpage={paginacionVac?.page}
                    totalpage={paginacionVac?.totalPages}
                    onPageChange={handlePageChangeVac}
                    totalItems={paginacionVac?.totalItems}
                />
            </div>
            <div>
                {(estadoAsignadoInscripto==='' || estadoAsignadoInscripto===null)
                ?<button
                    className="border-2 border-[#7C8EA6] mt-4 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                    onClick={()=>submitCloseModalVac()}
                    translate='no'
                >CERRAR</button>
                :<div>
                    <button
                        className="border-2 border-[#7C8EA6] mt-2 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                        onClick={()=>{submitGuardarEstadoInscripto();submitCloseModalVac()}}
                        translate='no'
                    >GUARDAR ESTADO</button>
                    <button
                        className="border-2 border-[#7C8EA6] mt-2 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                        onClick={()=>{submitCloseModalVac();setEstadoAsignadoInscripto('')}}
                        translate='no'
                    >CANCELAR</button>
                </div>

                }
                
            </div>
        </div>
    )
};

export default ContentModalVacantesDispTit;