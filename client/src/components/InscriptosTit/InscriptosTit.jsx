import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { outUser } from "../../redux/userSlice";
import { fetchAllInscriptosTit } from "../../utils/fetchAllInscriptosTit";
import { useEffect, useState } from "react";
import { FaDotCircle, FaSearch, FaEye, FaTimes, FaEdit} from "react-icons/fa";
import Paginador from "../Paginador/Paginador";
import ModalEdit from "../ModalEdit/ModalEdit";
import {useModal} from '../../hooks/useModal';
import ContentModalDatosInscriptoTit from "../ContentModalDatosInscriptosTit/ContentModalDatosInscriptoTit";
import {URL} from '../../../varGlobal';
import axios from "axios";
import Modal from "../Modal/Modal";
import { fetchAllEspecialidades } from "../../utils/fetchAllEspecialidades";

const InscriptosTit = () =>{
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //E.G que trae la configuracion de sistema
    const configSG = useSelector((state)=>state.config);
    const userSG = useSelector((state)=>state.user);
    
    //E.L. de ventanas modales
    const[isOpenModalEdit,openModalEdit,closeModalEdit]=useModal(false);
    const[isOpenModal, openModal, closeModal]=useModal(false);

    //E.L. para Mensaje en Modal de Notificaciones
    const[mensajeModalInfo, setMensajeModalInfo]=useState('');

    //EL guardo el id del listado de inscriptos de titularizacion
    const[idListadoInscriptosTit, setIdListadoInscriptosTit]=useState('');

    //E.L. guarda la pagina actual
    const[currentPage, setCurrentPage]=useState(1);

    //E.L. para guardar datos de paginacion
    const[paginacion, setPaginacion]=useState('');

    //E.L. para filtro de estado de los incriptos
    //puede ser: "todos", "sinasignar" o "asignados"
    const[estadoInscripto, setEstadoInscripto]=useState('todos');

    //E.L. donde se almacena el Listado de Inscriptos (carga inicial)
    //y segun el tipo de listado segun configuracion
    const[listadoInscriptosTit, setListadoInscriptosTit]=useState([]);

    //E.L. donde se almacena el listado de especialidades
    const[listadoEspecialidades, setListadoEspecialidades]=useState([]);

    //E.L. para input busqueda
    const[inputSearch, setInputSearch]=useState('');

    const[datosInscriptoSelect, setDatosInscriptoSelect]=useState({})

    const[idInscriptoSelect, setIdInscriptoSelect]=useState('');

    const[formInscripto, setFormInscripto]=useState({
        orden:'',
        dni:'',
        apellido:'',
        nombre:'',
        total:'',
        id_especialidad:''
    });

    const[formEstado, setFormEstado]=useState('ver');

    const[selectFiltroEspecialidad, setSelectFiltroEspecialidad]=useState("");

    //-------------------------------------
    //      PROCEDIMIENTOS Y FUNCIONES
    //-------------------------------------

    const logOut = () =>{
        dispatch(outUser());
        navigate('/')
    };

    //Proc que trae el ID del listado configurado
    const buscoIdlistadoInscrip = async(id_nivel) =>{
        //Filtro configuracion para el nivel
        const configFilterNivel = await configSG.config.filter((configNivel)=>configNivel.id_nivel==id_nivel);
        console.log('que trae configFilterNivel: ', configFilterNivel);

        //Traigo el id_listado cargado en configuracion para:
        //LISTADO DE INSCRIPTOS DE TITULARIZACION -> id_listado_inscriptos_tit
        const idFilterListado = configFilterNivel[0]?.id_listado_inscriptos_tit;
        console.log('que tiene idFilterListado: ',idFilterListado);

        //Guardo el id del listado de inscriptos
        setIdListadoInscriptosTit(idFilterListado);

        //LLAMO AL PROCEDIMIENTO PARA TRAER EL LISTADO
        await getInscriptosTit(idFilterListado,currentPage,estadoInscripto,inputSearch,selectFiltroEspecialidad);
        
    };

    //Este Proc carga el listado de inscriptos_tit al E.L
    const getInscriptosTit = async(id_listado,page,filtroAsignacion,valorBusqueda,filtroEspecialidad) =>{
        let data;
        const limit=10;
        console.log('que trae id_listado getInscriptosTitListado: ', id_listado);
        if(id_listado){
            //paso id_listado, limit y page
            data = await fetchAllInscriptosTit(id_listado, limit, page,filtroAsignacion, valorBusqueda,filtroEspecialidad);
            console.log('que trae data de fetchAllInscriptosMov: ', data);

            if(data.result?.length!=0){
                setListadoInscriptosTit(data.result); 
                setPaginacion(data.paginacion);
            }else{
                setListadoInscriptosTit([]);
                setPaginacion(data.paginacion);
            };
        };
    }; 

    //Este Proc carga el listado de especialidades en E.L.
    const cargaEspecidalidades=async()=>{
        const data = await fetchAllEspecialidades();
        console.log('que tiene especialidades: ', data);
        if(data?.length!=0){
            setListadoEspecialidades(data);
        }
    }

    //-----------PROCESOS DE BUSQUEDA EN LISTADO INSCRIPTOS------------
    //Escribir dentro del input de busqueda
    const handleInputSearchChange = (event) =>{
        const {value} = event.target;
        setInputSearch(value);
    };

    //Presiono boton Cancelar (X) dentro de input busqueda
    const handleCancelSearch=async()=>{
        setInputSearch('')
        setCurrentPage(1);
    };
     
    //-------------------------------------------------------------------

    const handlePageChange = (nuevaPagina)=>{
        if(nuevaPagina>0 && nuevaPagina<=paginacion?.totalPages){
            setCurrentPage(nuevaPagina);
        };
    };

    const submitVerDatosInscripto = async(datosInscripto)=>{
        console.log('presiono en submitVerDatosInscripto');
        console.log('que tiene datos inscripto: ', datosInscripto);
        setDatosInscriptoSelect(datosInscripto);
        openModalEdit();
    };

    const seteoDatosInicialesFormInscripto=()=>{
        setFormInscripto({
            orden:datosInscriptoSelect.orden,
            dni:datosInscriptoSelect.dni,
            apellido:datosInscriptoSelect.apellido,
            nombre:datosInscriptoSelect.nombre,
            total:datosInscriptoSelect.total,
            id_especialidad:datosInscriptoSelect.id_especialidad
        });
        setIdInscriptoSelect(datosInscriptoSelect.id_inscriptos_tit);
        setFormEstado('ver');
    }

    const handleChangeFormInscripto = (event)=>{
        const{name, value} = event.target;
        setFormInscripto({
            ...formInscripto,
            [name]:value
        });
        setFormEstado('editar');
    }

    const submitGuardarFormInscripto=async()=>{
        console.log('presiono en submitGuardarFormInscripto');
        const idInscriptoTit = idInscriptoSelect;
        await axios.put(`${URL}/api/editinscriptotit/${idInscriptoTit}`,formInscripto)
            .then(async res=>{
                console.log('que trae res de editinscriptotit: ', res);
                //Mostar mensaje de datos actualizados.
                setMensajeModalInfo('Datos Modificados Correctamente')
                openModal();
            })
            .catch(error=>{
                console.log('que trae error editinscriptotit: ', error);
            })
    };

    const submitCloseModal = ()=>{
        closeModal();
        closeModalEdit();
        setFormEstado('ver');
        //recargo lista de inscriptos por alguna edicion en datos
        getInscriptosTit(idListadoInscriptosTit,currentPage,estadoInscripto,inputSearch,selectFiltroEspecialidad);
    };

    const handleSelectFiltroEspecialidad=(event)=>{
        const{value} = event.target;
        console.log('que tiene filtroEspecialidad: ', value);
        setSelectFiltroEspecialidad(value);
        //al seleccionar una especialidad, regrso a la primer pagina, por si no hay tantos inscriptos
        setCurrentPage(1);
        //getInscriptosTit(idListadoInscriptosTit,currentPage,estadoInscripto,inputSearch,value);
    };

    useEffect(()=>{
        seteoDatosInicialesFormInscripto();
    },[datosInscriptoSelect])

    // useEffect(()=>{
    //     getInscriptosTit(idListadoInscriptosTit,currentPage,estadoInscripto,inputSearch,selectFiltroEspecialidad);
    // },[selectFiltroEspecialidad])

    useEffect(()=>{
        console.log('APLICO FILTRO');
        getInscriptosTit(idListadoInscriptosTit,currentPage,estadoInscripto,inputSearch,selectFiltroEspecialidad);
    },[estadoInscripto,inputSearch,selectFiltroEspecialidad])

    useEffect(()=>{
        //recargo listado de inscriptos con la nueva pagina
        getInscriptosTit(idListadoInscriptosTit,currentPage,estadoInscripto,inputSearch,selectFiltroEspecialidad);
    },[currentPage])


    //AL INGRESAR SE CARGA EL LISTADO DE INSCRIPTOS
    useEffect(()=>{
        //?PROCESO SE EJECUTA EN CARGA INICIAL
        //LLAMO AL PROCEDIMIENTO buscoIdlistadoInscrip Y PASO EL NIVEL CARGADO EN STORE GLOBAL
        buscoIdlistadoInscrip(configSG.nivel.id_nivel);


        //Cargo las especialidades
        cargaEspecidalidades();

        //LLAMO AL PROCEDIMIENTO buscoIDListadoVacantes Y PASO EL NIVEL CARGADO EN STORE GLOBAL
        //buscoIDListadoVacantes(configSG.nivel.id_nivel);

    },[]);
    
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
                    <div className="ml-4 flex flex-row">
                        <label className="mr-2 ">Especialidad: </label>
                        <select
                            className=" border-[1px] rounded border-gray-500"
                            name="filtroEspecialidad"
                            onChange={handleSelectFiltroEspecialidad}
                            value={selectFiltroEspecialidad}
                        >
                            <option value='' selected disabled>Seleccione...</option>
                            {
                                listadoEspecialidades?.map((especialidad,index)=>(
                                    <option key={index} value={especialidad.id_especialidad}>{especialidad.abreviatura} - {especialidad.descripcion}</option>
                                ))
                            }
                        </select>
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

            {/* CONTENIDO DE PAGINA */}
            <div className="h-[87vh]">
                <div className="m-2 border-[1px] border-[#758C51] rounded h-[72vh]">
                    {/* PARTE SUPERIOR DE TABLA */}
                    <div className="border-b-[1px] border-slate-300 h-[6vh] flex flex-row items-center">
                        {/* Filtros */}
                        <div className="text-base w-[50%] ">
                            <label 
                                className={`border-b-2 px-2 cursor-pointer transition-all duration-500 
                                    ${(estadoInscripto==='todos')
                                        ?`border-sky-500 text-sky-500`
                                        :`border-zinc-300 text-black`
                                    }
                                    `}
                                onClick={()=>setEstadoInscripto('todos')}
                            >Todos</label>
                            <label 
                                className={`border-b-2 px-2 cursor-pointer transition-all duration-500 
                                    ${(estadoInscripto==='sinasignar')
                                        ?`border-sky-500 text-sky-500`
                                        :`border-zinc-300 text-black`
                                    }
                                    `}
                                onClick={()=>setEstadoInscripto('sinasignar')}
                            >Sin Asignar</label>
                            <label 
                                className={`border-b-2 px-2 cursor-pointer transition-all duration-500 
                                    ${(estadoInscripto==='asignados')
                                        ?`border-sky-500 text-sky-500`
                                        :`border-zinc-300 text-black`
                                    }
                                    `}
                                onClick={()=>setEstadoInscripto('asignados')}
                            >Asignados</label>
                        </div>

                        {/* Campo de Busqueda */}
                        <div className="w-[50%]  flex justify-end">
                            <div className="border-[1px] border-zinc-400 w-[20vw] rounded flex flex-row items-center justify-between mr-2">
                                <input 
                                    className="w-[15vw] focus:outline-none rounded"
                                    placeholder="Buscar..."
                                    type="text"
                                    value={inputSearch}
                                    onChange={handleInputSearchChange}
                                />
                                <div className="flex flex-row items-center">
                                    {(inputSearch!='') &&
                                        <FaTimes
                                            className="text-slate-400 cursor-pointer text-lg"
                                            onClick={()=>handleCancelSearch()}
                                        />
                                    }
                                    {/* <FaSearch 
                                        className="text-zinc-500 cursor-pointer mr-2"
                                        onClick={()=>submitSearch()}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PARTE INFERIOR DE DATOS DE TABLA */}
                    <div className="h-[79vh] overflow-y-auto">
                        <table className="border-[1px] bg-slate-50 w-full">
                            <thead>
                                <tr className="sticky top-0 text-sm border-b-[1px] border-zinc-300 bg-zinc-200">
                                    <th className="border-r-[1px] border-zinc-300">Orden</th>
                                    <th className="border-r-[1px] border-zinc-300">Puntaje</th>
                                    <th className="border-r-[1px] border-zinc-300">Apellido</th>
                                    <th className="border-r-[1px] border-zinc-300">Nombre</th>
                                    <th className="border-r-[1px] border-zinc-300">DNI</th>
                                    <th className="border-r-[1px] border-zinc-300">Especialidad</th>
                                    <th className="">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // filterListadoInscriptosMov?.map((inscripto, index)=>{
                                    listadoInscriptosTit?.map((inscripto, index)=>{
                                        const colorFila = inscripto.vacante_asignada ?`bg-red-200` :(((inscripto.id_inscriptos_tit % 2)===0) ?`bg-zinc-200` :``)
                                        return(
                                            <tr 
                                                className={`text-lg font-medium border-b-[1px] border-zinc-300 h-[5vh] hover:bg-orange-300 ${colorFila}`}
                                                key={index}
                                            >
                                                <td className="text-center">{inscripto.orden}</td>
                                                <td className="text-center">{inscripto.total}</td>
                                                <td>{inscripto.apellido}</td>
                                                <td>{inscripto.nombre}</td>
                                                <td>{inscripto.dni}</td>
                                                <td>{inscripto.especialidad}</td>
                                                <td>
                                                    <div className="flex flex-row items-center justify-center  ">
                                                        {/* {(inscripto.vacante_asignada===null )
                                                            ?<FiAlertTriangle    
                                                                className="mr-2 blink text-red-500"
                                                                />
                                                            :``
                                                        } */}
                                                        <FaEye 
                                                            className="hover:cursor-pointer hover:text-[#83F272]" 
                                                            title="Ver Datos"
                                                            onClick={()=>submitVerDatosInscripto(inscripto)}
                                                        />
                                                        {/* {
                                                            (inscripto.vacante_asignada===null || inscripto.vacante_asignada==='')
                                                            ?<BiTransferAlt 
                                                                className="text-2xl hover:cursor-pointer hover:text-[#83F272] ml-2"      
                                                                title="Vacantes"
                                                                onClick={()=>submitVerVacantes(inscripto)}
                                                            />
                                                            :``
                                                        } */}
                                                        
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

                {/* SECCION PAGINACION */}
                <div className="flex justify-center">
                    <Paginador 
                        currentpage={paginacion.page}
                        totalpage={paginacion.totalPages}
                        onPageChange={handlePageChange}
                        totalItems={paginacion.totalItems}
                    />
                </div>

            </div>

            {/* MODAL DE DATOS DEL INSCRPTO */}
            <ModalEdit isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
                <ContentModalDatosInscriptoTit
                    datosFormInscripto = {formInscripto}
                    idInscriptoSelect={idInscriptoSelect}
                    closeModal={closeModalEdit}
                    handleChangeFormInscripto={handleChangeFormInscripto}
                    formEstadoInscripto={formEstado}
                    submitGuardarFormInscripto={submitGuardarFormInscripto}
                />

            </ModalEdit>
            {/* MODAL DE NOTIFICACIONES */}
            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <div className="mt-10 w-72">
                    <h1 className="text-xl text-center font-bold">{mensajeModalInfo}</h1>
                    <div className="flex justify-center">
                        <button
                            className="border-2 border-[#557CF2] mt-10 font-bold w-40 h-8 bg-[#557CF2] text-white hover:bg-sky-300 hover:border-sky-300"
                            onClick={()=>submitCloseModal()}
                        >OK</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default InscriptosTit;