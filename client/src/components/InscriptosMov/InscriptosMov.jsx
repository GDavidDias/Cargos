import { useEffect, useState } from "react";
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useSelector } from "react-redux";
import { fetchAllInscriptosMov } from "../../utils/fetchAllInscriptosMov";
import { useNavigate } from "react-router-dom";
import { FaDotCircle, FaSearch, FaEye, FaTimes} from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import {useModal} from '../../hooks/useModal';
import ModalEdit from "../ModalEdit/ModalEdit";
import Modal from '../Modal/Modal';
import axios from "axios";
import {URL} from '../../../varGlobal';


const InscriptosMov = ()=>{
    const[isOpenModalEdit,openModalEdit,closeModalEdit]=useModal(false);
    const[isOpenModal,openModal,closeModal]=useModal(false);
    const[mensajeModalInfo, setMensajeModalInfo]=useState('');
    const configSG = useSelector((state)=>state.config);
    const navigate = useNavigate();

    //ESTADO PARA PODER FILTRAR LOS LISTADOS SE DETERMINA QUE 
    // disponibilidad -> 1
    // activos -> 2
    const[tipoInscripto, setTipoInscripto]=useState(2);

    //ESTADO DONDE SE ALMACENA EL LISTADO POR TIPO DE LISTADO
    const[listadoInscriptosMov, setListadoInscriptosMov]=useState([]);

    //ESTADO PARA APLICAR FILTROS SOBRE EL LISTADO CARGADO INICIALMENTE
    const[filterListadoInscriptosMov, setFilterListadoInscriptosMov]=useState([]);

    //ESTADO QUE ALMACENA LOS DATOS DE UN INSCRIPTO SELECIONADO PARA VER SUS DATOS
    const[datosInscriptoSelect, setDatosInscriptoSelect]=useState('');

    //cargo_actual, cargo_solicitado, dni, apellido, nombre, observacion, total, orden, nro_escuela, legajo, id_especialidad, id_tipo_inscripto, id_listado_inscriptos
    const[formInscripto, setFormInscripto]=useState({
        cargo_actual:'', 
        cargo_solicitado:'', 
        dni:'', 
        apellido:'', 
        nombre:'', 
        observacion:'', 
        total:'', 
        orden:'', 
        nro_escuela:'', 
        legajo:'', 
        id_especialidad:'', 
        id_tipo_inscripto:'', 
        id_listado_inscriptos:''
    });
    //ESTADO USADO PARA VALIDAR SI MODIFICO ALGUN DATO DEL FORMULARIO, DE SER ASI
    //ESTADO CAMBIA A editar -> HABILITA BOTONES GUARDAR Y CANCELAR
    //SI NO MODIFICA NADA EL ESTADO ES ver -> HABILITA BOTON CERRAR
    const[estadoForm, setEstadoForm]=useState('ver');

    //ESTADO USADO EN CAMPO BUSQUEDA
    const[inputSearch, setInputSearch]=useState('');

    //ESTADO LOCAL DE FILTRO DE ESTADO DE LOS INSCRIPTOS
    //PUEDEN SER: "todos", "sinasignar" o "asignados"
    //PARA NO TENER UN CAMPOS ADICIONAL SOBRE ESTADO
    const[estadoInscripto, setEstadoInscripto]=useState('todos');


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

    //PRESIONO SOBRE BOTON VER DATOS DEL INSCRIPTO
    const submitVerDatosInscripto = (datos) =>{
        //ENVIO A STORE LOCAL DATOS DE INSCRIPTO PARA MOSTRARLO EN MODAL Y PODER EDITARLOS
        console.log('que recibe datos inscripto: ', datos);
        setDatosInscriptoSelect(datos);
        openModalEdit();
    };

    const handleChange = (event) => {
        const{name, value} = event.target;
        setFormInscripto({
            ...formInscripto,
            [name]:value
        });
        setEstadoForm('editar');
    };

    const valoresInicialesFormInscripto = ()=>{
        //CARGAR EN EL STORE LOCAL LOS DATOS DEL INSCRIPTO SELECCIONADO
        setFormInscripto({
            cargo_actual:datosInscriptoSelect.cargo_actual, 
            cargo_solicitado:datosInscriptoSelect.cargo_solicitado, 
            dni:datosInscriptoSelect.dni, 
            apellido:datosInscriptoSelect.apellido, 
            nombre:datosInscriptoSelect.nombre, 
            observacion:datosInscriptoSelect.observacion, 
            total:datosInscriptoSelect.total, 
            orden:datosInscriptoSelect.orden, 
            nro_escuela:datosInscriptoSelect.nro_escuela, 
            legajo:datosInscriptoSelect.legajo, 
            id_especialidad:datosInscriptoSelect.id_especialidad, 
            id_tipo_inscripto:datosInscriptoSelect.id_tipo_inscripto, 
            id_listado_inscriptos:datosInscriptoSelect.id_listado_inscriptos
        });
        setEstadoForm('ver');
    };

    const submitGuardarCambiosFormInscripto = async() =>{
        const idInscripto = datosInscriptoSelect.id_inscriptos_mov;
        console.log(' que tiene idInscripto: ', idInscripto);
        await axios.put(`${URL}/api/editinscriptosmov/${idInscripto}`,formInscripto)
            .then(async res=>{
                console.log('que trae res de editinscriptosmov: ', res);
                //MOSTRAR MENSAJE DE DATOS ACTUALIZADOS
                setMensajeModalInfo('Datos Modificados Correctamente')
                openModal();
            })
            .catch(error=>{
                console.log('que trae error editinscriptosmov: ', error)
            });
    };

    const submitCloseModal = ()=>{
        closeModal();
        //CAMBIO ESTADO DE ESTADO FORM INSCRIPTO
        setEstadoForm('ver');
        //CARGO DE NUEVO EL LISTADO DE INSCRIPTOS CON DATOS ACTUALIZADOS Y 
        //APLICO FILTRO DE "Activos" o "Disponibilidad"
        recargaListadoInscriptos();
    };

    //ESTE PROCEDIMIENTO CARGA DE NUEVO EL LISTADO DE INSCRIPTOS POR ALGUNA
    //MODIFICACION EN LOS DATOS QUE SE OBSERVAN
    //TAMBIEN SE USA PARA APLICAR FILTROS AL SELECCIONAR ALGUNO
    const recargaListadoInscriptos = async() =>{
        try{
            //LLAMO A PROCECIMIENTO PARA BUSCAR ID_LISTADO Y EL MISMO TRAE
            //DATOS DE INCRIPTOS Y CARGA EN ESTADO LOCAL
            await buscoIdlistadoInscrip(configSG.nivel.id_nivel);
    
            //APLICO LOS FILTROS
            aplicoFiltrosListado(listadoInscriptosMov);
            
        }catch(error){
            console.error('Error al recargar el listado de inscriptos: ', error);
        }
    };


    //PROCESO QEU SE EJECUTA AL APLICAR ALGUN FILTRO
    const aplicoFiltrosListado = async(data) =>{
        //ELIMINO LA BUSQUEDA YA QUE SE DEBE EJECUTAR CON FILTROS YA APLICADOS
        setInputSearch('');

        let dataFilter = await data.filter(item=>{
            if(tipoInscripto===1){
                if(estadoInscripto==='asignados'){
                    return(
                        (!tipoInscripto || item.id_tipo_inscripto===1) &&
                        (!estadoInscripto || item.vacante_asignada!=null)
                    );
                }else if(estadoInscripto==='sinasignar'){
                    return(
                        (!tipoInscripto || item.id_tipo_inscripto===1) &&
                        (!estadoInscripto || item.vacante_asignada===null)
                    );
                }else if(estadoInscripto==='todos'){
                    return(
                        (!tipoInscripto || item.id_tipo_inscripto===1)
                    );
                }
            }else{
                if(estadoInscripto==='asignados'){
                    return(
                        (!tipoInscripto || item.id_tipo_inscripto!=1) &&
                        (!estadoInscripto || item.vacante_asignada!=null)
                    );
                }else if(estadoInscripto==='sinasignar'){
                    return(
                        (!tipoInscripto || item.id_tipo_inscripto!=1) &&
                        (!estadoInscripto || item.vacante_asignada===null)
                    );
                }else if(estadoInscripto==='todos'){
                    return(
                        (!tipoInscripto || item.id_tipo_inscripto!=1)
                    );
                }
            };
        });

        setFilterListadoInscriptosMov(dataFilter)
    };


    //PROCESO QUE SE EJECUTA AL INICIAR RENDERIZADO
    //MUESTRA LOS INSCRIPTOS "Activos" = 1
    const filtroInicialListado = () =>{
        const listadoFiltrado = listadoInscriptosMov.filter((inscriptos)=>inscriptos.id_tipo_inscripto===1);

        setFilterListadoInscriptosMov(listadoFiltrado);
    };

    //ESCRIBO DENTRO DE INPUT SEARCH
    const handleInputSearchChange = (event) =>{
        const {value} = event.target;
        setInputSearch(value);
    };

    //PRESIONO EN BOTON CANCELAR DENTRO DE INPUT SEARCH
    const handleCancelSearch=async()=>{
        //seteoFiltrosBusquedaInicio();
        setInputSearch('')
        //setDocRecFilter(docrecSG);
        aplicoFiltrosListado(listadoInscriptosMov);
    };

    //SE BUSCAN LOS DOCUMENTOS QUE SE GUARDARON EN EL STORE GLOBAL USANDO FILTRO SEGUN EL INPUT SEARCH
    const submitSearch = async()=>{
        //console.log('presiono buscar con este input: ', inputSearch);
        let searchDoc;
        searchDoc = await filterListadoInscriptosMov.filter(inscripto=>inscripto.nombre.toLowerCase().includes(inputSearch.toLowerCase()) || inscripto.apellido.toLowerCase().includes(inputSearch.toLowerCase()) || inscripto.nro_escuela.toLowerCase().includes(inputSearch.toLowerCase()) || inscripto.dni.includes(inputSearch));
        setFilterListadoInscriptosMov(searchDoc);
    };    

    useEffect(()=>{
        console.log('que tien campo inputSearch: ', inputSearch);
    },[inputSearch])

    useEffect(()=>{
        //CARGA VALORES INICIALES EN formInscripto y coloca estadoForm en 'ver'
        valoresInicialesFormInscripto();
    },[datosInscriptoSelect]);

    useEffect(()=>{
        console.log('como queda el listado filtrado filterListadoInscriptosMov: ', filterListadoInscriptosMov);
    },[filterListadoInscriptosMov])

    //SI HAY ALGUNA MODIFICACION EN UN FILTRO O SI listadoInscriptoMov se actualiza por alguna modificacion
    //en un inscripto se ejecuta applyFilters
    useEffect(()=>{
        console.log('APLICO FILTRO')
        console.log('que tiene estado local tipoInscripto: ', tipoInscripto);
        console.log('que tiene estado local estadoInscripto: ', estadoInscripto);
        //AL CAMBIAR ESTADO DE TIPO INSCRIPTO, LLAMO A FUNCION QUE APLICA FILTROS
        //PASO EL LISTADO ORIGINAL CARGADO AL INICIAR listadoInscriptosMov
        aplicoFiltrosListado(listadoInscriptosMov);
    },[listadoInscriptosMov,tipoInscripto, estadoInscripto])

    //VEO EL LISTADO DE INSCRIPTOS DE MOVIMIENTO
    useEffect(()=>{
        console.log('que tiene listadoInscriptosMov (CARGA INICIAL): ', listadoInscriptosMov);
        //?PROCESO SE EJECUTA EN CARGA INICIAL
        //NI BIEN CARGO EL LISTADO DE INSCRIPTOS FILTRO CON ESTADO ACTIVO
        //FILTRO EL LISTADO DE INSCRIPTOS DE MOVIMIENTO
        filtroInicialListado();
        //filtroEstadoInscripto(estadoInscripto);
    },[listadoInscriptosMov])

    //VEO LA CONFIGURACION GLOBAL
    useEffect(()=>{
        //?PROCESO SE EJECUTA EN CARGA INICIAL
        console.log('que tiene configSG en InscriptosMov (CARGA INICIAL): ', configSG);
    },[configSG])


    //AL INGRESAR SE CARGA EL LISTADO DE INSCRIPTOS
    useEffect(()=>{
        //?PROCESO SE EJECUTA EN CARGA INICIAL
        //LLAMO AL PROCEDIMIENTO buscoIdlistadoInscrip Y PASO EL NIVEL CARGADO EN STORE GLOBAL
        console.log('que listado configurado del nivel trae (CARGA INICIAL): ',buscoIdlistadoInscrip(configSG.nivel.id_nivel));

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
                            <div className="border-[1px] border-zinc-300 w-[20vw] flex flex-row items-center justify-between">
                                <input 
                                    className="w-[60mm] focus:outline-none rounded"
                                    placeholder="Buscar..."
                                    type="text"
                                    value={inputSearch}
                                    onChange={handleInputSearchChange}
                                />
                                <div className="flex flex-row">
                                    {(inputSearch!='') &&
                                        <FaTimes
                                            className="text-slate-400 cursor-pointer "
                                            onClick={()=>handleCancelSearch()}
                                        />
                                    }
                                    <FaSearch 
                                        className="text-zinc-500 cursor-pointer border-2 border-sky-300 mr-2"
                                        onClick={()=>submitSearch()}
                                    />
                                </div>
                            </div>
                        </div>
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
                                                <td>
                                                    <div className="flex flex-row items-center justify-between mx-2">
                                                        <FaEye 
                                                            className="hover:cursor-pointer hover:text-[#83F272]" 
                                                            title="Ver Datos"
                                                            onClick={()=>submitVerDatosInscripto(inscripto)}
                                                        />
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
        
        <ModalEdit isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
            <div className="border-2 border-green-500 h-100 w-100 ">
                <label className="text-xl text-center font-bold " translate='no'>DATOS DEL INSCRIPTO</label>
                <div className="h-[40vh] w-[50vw] mt-5">
                    <div className="flex flex-row">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">N°Orden</label>
                            <input 
                                className="border-[1px] border-zinc-400 w-[15mm] text-center"
                                value={formInscripto.orden}
                                disabled={true}
                            />
                        </div>
                        
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Apellido</label>
                            <input 
                                name="apellido"
                                className="border-[1px] border-zinc-400 w-[50mm] pl-[2px]"
                                value={formInscripto.apellido}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Nombre</label>
                            <input 
                                name="nombre"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px]"
                                value={formInscripto.nombre}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Puntaje</label>
                            <input 
                                name="total"
                                className="border-[1px] border-zinc-400 w-[15mm] text-center"
                                value={formInscripto.total}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">DNI</label>
                            <input 
                                name="dni"
                                className="border-[1px] border-zinc-400 w-[35mm] pl-[2px]"
                                value={formInscripto.dni}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Escuela</label>
                            <input 
                                name="nro_escuela"
                                className="border-[1px] border-zinc-400 w-[55mm] pl-[2px]"
                                value={formInscripto.nro_escuela}
                                onChange={handleChange}
                            />
                        </div>
                        
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Cargo Actual</label>
                            <input 
                                name="cargo_actual"
                                className="border-[1px] border-zinc-400 w-[25mm] pl-[2px]"
                                value={formInscripto.cargo_actual}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Cargo Solicitado</label>
                            <input 
                                name="cargo_solicitado"
                                className="border-[1px] border-zinc-400 w-[25mm] pl-[2px]"
                                value={formInscripto.cargo_solicitado}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mt-4">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Observaciones</label>
                            <input 
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px]"
                                value={formInscripto.observacion}
                                disabled={true}
                            />
                        </div>
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Legajo</label>
                            <input 
                                name="legajo"
                                className="border-[1px] border-zinc-400 w-[30mm] pl-[2px]"
                                value={formInscripto.legajo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* VISIBILIDAD DE BOTONES */}
                <div className="flex justify-center">
                    {(estadoForm==='ver') &&
                        <button
                            className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                            onClick={closeModalEdit}
                            translate='no'
                        >CERRAR</button>
                    }
                    {(estadoForm==='editar') &&
                        <div>
                            <button
                                className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={()=>submitGuardarCambiosFormInscripto()}
                                translate='no'
                            >GUARDAR</button>
                            <button
                                className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={()=>valoresInicialesFormInscripto()}
                                translate='no'
                            >CANCELAR</button>
                        </div>
                    }

                </div>

            </div>
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

export default InscriptosMov;