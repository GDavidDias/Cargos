import { BiTransferAlt } from "react-icons/bi";
import { TbSortAscending , TbSortDescending } from "react-icons/tb";
import Paginador from "../Paginador/Paginador";
import { FaDotCircle, FaSearch, FaEye, FaTimes, FaEdit} from "react-icons/fa";

const ContentModalVacantesDispTit = ({datosInscriptoSelect,submitCloseModalVac,listadoVacantesDispTit,currentPageVac,paginacionVac,handlePageChangeVac,inputSearchVac,handleInputSearchVacChange,submitVerAsignacion}) =>{
    return(
        <div className="notranslate h-100 w-100 flex flex-col items-center">
            <label 
                className="text-xl text-center font-bold flex flex-row items-center" 
                translate='no'
            >Vacantes Disponibles<p className="text-sm font-light ml-2">()</p></label>
            {/* DATOS DEL INSCRIPTO */}
            <div className="border-[1px] border-zinc-300  flex justify-center rounded-md shadow font-semibold">
                <label className="mx-4 text-zinc-500">Docente: {datosInscriptoSelect.apellido} {datosInscriptoSelect.nombre}</label>
                {/* <label className="mr-4 text-red-400">Cargo Origen: {datosInscriptoSelect.cargo_actual}</label>
                <label className="mr-4 text-sky-500">Cargo Solicitado: {datosInscriptoSelect.cargo_solicitado}</label> */}
            </div>
            <div className="h-[60vh] w-[90vw] mt-2 ">
                {/* DATOS DE VACANTES */}
                {/* PARTE SUPERIOR-FILTROS Y BUSQUEDA */}
                <div className="border-[1px] border-zinc-400 rounded-t-lg h-[9vh] flex flex-col bg-[#dde8b7]">
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
                    {/* ENCABEZADO DE CAMPOS  */}
                    <div className="flex flex-row">
                        <div className="flex flex-row items-center justify-center w-[2vw] border-r-[1px] border-zinc-200 hover:text-sky-500">
                            <label className="font-base">ID</label>
                        </div>
                        <div className="flex flex-row items-center justify-center w-[15vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">N° Establecimiento</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Establecimiento</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Especialidad</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Turno</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Region</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Departamento</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                            <label className="font-semibold">Localidad</label>
                            {/* <LuArrowUpDown className="ml-2"/> */}
                        </div>
                        <div className="flex flex-row items-center justify-center w-[8vw] ">
                            <label className="font-semibold">Modalidad</label>
                        </div>
                        <div className="flex flex-row items-center justify-center w-[8vw] ">
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
                                            <td className="w-[2vw] pl-[4px] font-light">{vacante.id_vacante_tit
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
                <button
                    className="border-2 border-[#7C8EA6] mt-4 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                    onClick={submitCloseModalVac}
                    translate='no'
                >CERRAR</button>
            </div>
        </div>
    )
};

export default ContentModalVacantesDispTit;