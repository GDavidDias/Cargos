import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInscriptosMov } from "../../utils/fetchAllInscriptosMov";
import { useNavigate } from "react-router-dom";
import {useModal} from '../../hooks/useModal';
import ModalEdit from "../ModalEdit/ModalEdit";
import Modal from '../Modal/Modal';
import axios from "axios";
import {URL} from '../../../varGlobal';
import { fetchVacantesDispMov } from "../../utils/fetchVacanteDispMov";
import { TbSortAscending , TbSortDescending } from "react-icons/tb";
import { fetchVacantesAsignadaMov } from "../../utils/fetchVacanteAsignadaMov";
import { fetchAsignacionByVacante } from "../../utils/fetchAsignacionByVacante";
import { updateIdVacanteGenerada } from "../../utils/updateIdVacanteGenerada";
import './InscriptosMov.modules.css';

import { useReactToPrint } from 'react-to-print';

//-------ICONOS--------
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { FaDotCircle, FaSearch, FaEye, FaTimes, FaEdit} from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { LuArrowUpDown } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { deleteVacanteMov } from "../../utils/deleteVacanteMov";
import { MdOutlineDoubleArrow } from "react-icons/md";
import Paginador from "../Paginador/Paginador";
import PaginaDesignacion from "../PaginaDesignacion/PaginaDesignacion";
import { outUser } from "../../redux/userSlice";
import { IoMdPrint } from "react-icons/io";



const InscriptosMov = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //E.G que trae la configuracion de sistema
    const configSG = useSelector((state)=>state.config);
    const userSG = useSelector((state)=>state.user);

    //E.L. de Ventanas Modales
    const[isOpenModalConfirm,openModalConfirm,closeModalConfirm]=useModal(false);
    const[isOpenModalAsign,openModalAsign,closeModalAsign]=useModal(false);
    const[isOpenModalVac,openModalVac,closeModalVac]=useModal(false);
    const[isOpenModalEdit,openModalEdit,closeModalEdit]=useModal(false);
    const[isOpenModal,openModal,closeModal]=useModal(false);
    const[mensajeModalInfo, setMensajeModalInfo]=useState('');
    const[mensajeModalConfirm, setMensajeModalConfirm]=useState('');

    //E.L. para filtrar los listados, que se determinan por
    // disponibilidad -> 1  / activos -> 2
    const[tipoInscripto, setTipoInscripto]=useState(2);

    //E.L. donde se almacena el Listado de Inscriptos (carga inicial)
    //y segun el tipo de listado segun configuracion
    const[listadoInscriptosMov, setListadoInscriptosMov]=useState([]);

    //guarda el id del listado de inscriptos
    const[idListadoInscriptosMov, setIdListadoInscriptosMov]=useState('');

    //E.L. para aplicar filtros sobre el listado de inscriptos
    const[filterListadoInscriptosMov, setFilterListadoInscriptosMov]=useState([]);

    //E.L. donde se almacena el listado de Vacantes Disponibles (carga inicial)
    //y segun el tipo de listado de vacantes indicado en configuracion
    const[listadoVacantesDispMov, setListadoVacantesDispMov]=useState([]);

    //E.L para aplicar filtros sobre el listado de Vacantes Disponibles
    const[filterListadoVacantesDispMov, setFilterListadoVacantesDispMov]=useState([]);

    //E.L. que almacena los datos de una Vacante Seleccionada
    const[datosVacanteSelect, setDatosVacanteSelect]=useState('');

    //E.L. que almacena los datos de un inscripto seleccionado
    const[datosInscriptoSelect, setDatosInscriptoSelect]=useState('');

    //E.L. de form que se usa para actualizar los datos del inscripto
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

    //E.L que se usa para validar si se modifico algun dato del formulario, si es asi
    //el estado cambia a "editar" -> habilita botones GUARDAR y CANCELAR
    //si no modifica nada el estado es "ver" - habilita boton CERRAR
    const[estadoForm, setEstadoForm]=useState('ver');

    //E.L. para input busqueda
    const[inputSearch, setInputSearch]=useState('');
    
    //E.L. para input busqueda en Vacantes Disponibles
    const[inputSearchVac, setInputSearchVac]=useState('');

    //E.L. para filtro de estado de los incriptos
    //puede ser: "todos", "sinasignar" o "asignados"
    const[estadoInscripto, setEstadoInscripto]=useState('todos');

    //E.L para guardar el campo que va a ordenar Vacantes
    const[campoOrderVac, setCampoOrderVac] = useState('');

    //E.L switch para guardar el tipo de Ordenamiento de los datos
    const[order, setOrder]=useState(true);

    //E.L guardo el id del listado de vacantes
    const[idListVacMov,setIdListVacMov]=useState();

    //E.L guardo el cargo(vacante) asignada al Inscripto seleccionado
    const[cargoAsignado, setCargoAsignado]=useState('');

    //E.L guardo datos de asignacion y docente que tomo cargo_original de otro docente
    const[asignacionCargoOriginal, setAsignacionCargoOriginal]=useState('');

    //E.L. para guardar datos de paginacion
    const[paginacion, setPaginacion]=useState('');

    //pagina actual
    const[currentPage, setCurrentPage]=useState(1);

    const componentRef = useRef(null);

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
        //LISTADO DE INSCRIPTOS DE MOVIMIENTOS -> id_listado_inscriptos_mov
        const idFilterListado = configFilterNivel[0]?.id_listado_inscriptos_mov;
        console.log('que tiene idFilterListado: ',idFilterListado);

        //Guardo el id del listado de inscriptos
        setIdListadoInscriptosMov(idFilterListado);

        //LLAMO AL PROCEDIMIENTO PARA TRAER EL LISTADO
        await getInscriptosMov(idFilterListado,currentPage,tipoInscripto,estadoInscripto);
    };

    //Este Proc carga el listado de inscriptos_mov al E.L
    const getInscriptosMov = async(id_listado,page,idTipoInscripto,filtroAsignacion,valorBusqueda) =>{
        let data;
        const limit=10;
        console.log('que trae id_listado getInscriptosMovListado: ', id_listado);
        if(id_listado){
            //paso id_listado, limit y page
            data = await fetchAllInscriptosMov(id_listado, limit, page,idTipoInscripto,filtroAsignacion, valorBusqueda);
            //console.log('que trae data de fetchAllInscriptosMov: ', data);

            if(data.result?.length!=0){
                setListadoInscriptosMov(data.result); 
                setPaginacion(data.paginacion);
            }else{
                setListadoInscriptosMov([]);
                setPaginacion(data.paginacion);
            };
        };
    }; 

    //Proc: traigo el ID del listado de Vacantes configurado
    const buscoIDListadoVacantes = async(id_nivel) =>{
        //Filtro configuracion para el nivel
        const configFilterNivel = await configSG.config.filter((configNivel)=>configNivel.id_nivel==id_nivel);
        console.log('que trae configFilterNivel: ', configFilterNivel);

        //Traigo el id del listado cargado en configuracion para:
        //LISTADO DE VACANTES DE MOVIMIENTOS -> id_listado_vacantes_mov
        const idFilterListado = configFilterNivel[0]?.id_listado_vacantes_mov;
        console.log('que tiene idFilterListado: ',idFilterListado);

        //Guardo id_listado_vacantes_mov para usarlo en Movimientos Rulos
        setIdListVacMov(idFilterListado);

        //LLAMO AL PROCEDIMIENTO PARA TRAER EL LISTADO DE VACANTES
        await getVacantesDisponiblesMov(idFilterListado)
    };

    //Este Proc carga el listado de VACANTES Disponibles al E.L
    const getVacantesDisponiblesMov = async(id_listado) =>{
        let data;
        //console.log('que trae id_listado getVacantesDisponiblesMov: ', id_listado);
        if(id_listado){
            data = await fetchVacantesDispMov(id_listado);
            console.log('que trae data de fetchVacantesDispMov: ', data);

            if(data?.length!=0){
                setListadoVacantesDispMov(data); 
                setFilterListadoVacantesDispMov(data);
            };
        };
    };  

    //Proc al presionar icono "Ver Datos", setea en E.L los datos del inscripto
    const submitVerDatosInscripto = async(datos) =>{
        console.log('que recibe datos inscripto: ', datos);
        setDatosInscriptoSelect(datos);
        //traigo los datos del cargo (vacante) asignado
        if (datos.vacante_asignada!=null && datos.vacante_asignada!=''){
            console.log('TIENE CARGO ASIGNADO');
            const data = await fetchVacantesAsignadaMov(datos.vacante_asignada);
            console.log('que trae data de fetchVacantesAsignadaMov: ', data[0]);
            setCargoAsignado(data[0]);
            setDatosVacanteSelect(data[0]);
        }else{
            setCargoAsignado('');
        }

        //Traigo los datos de asignacion de su cargo original y docente quien lo tomo
        
        const datosAsignacion = await fetchAsignacionByVacante(datos.id_vacante_generada_cargo_actual);
        console.log('que tra datosAsignacion de vacante generada: ', datosAsignacion);
        setAsignacionCargoOriginal(datosAsignacion);

        openModalEdit();
    };

    //Proc que se ejecuta al realizar alguna modificacion en los inputs de los 
    //datos del inscripto, cambiando el estado del form a "editar"
    const handleChange = (event) => {
        const{name, value} = event.target;
        setFormInscripto({
            ...formInscripto,
            [name]:value
        });
        setEstadoForm('editar');
    };

    //Proc q carga en E.L. datos de inscripto seleccionado
    const valoresInicialesFormInscripto = ()=>{
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

    //Proc al guardar cambios en los datos del inscripto
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

    //Proc al cerrar Ventana Modal de Notificacion llamado desde
    //Ventana Modal de Datos de Inscripto
    const submitCloseModal = ()=>{
        //Cierro Modal Notificacion
        closeModal();
        //Cierro Modal de Asignacion
        closeModalAsign();
        //Cierro Modal de Vacantes Disponibles
        closeModalVac();
        //Cambio estado de form inscripto
        setEstadoForm('ver');
        //Vacio estado de Inscripto Seleccionado
        setDatosInscriptoSelect('');
        //Vacio estado de Vacante Seleccionada
        setDatosVacanteSelect('');
        //Cargo de nuevo listado de inscriptos con datos actualizados,
        //aplico los filtros y traigo dato si fue asignado o no
        //recargaListadoInscriptos();
        getInscriptosMov(idListadoInscriptosMov,currentPage,tipoInscripto,estadoInscripto,inputSearch);
    };

    
    //Proc: realiza recarga de listado de inscriptos, por alguna modificacion
    //tambien aplica los filtros seteados en los estados
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


    //Proc: se ejecuta al aplicar algun filtro
    const aplicoFiltrosListado = async(data) =>{
        //Borro campos Input Busqueda, ya que primero se aplica filtro y luego busqueda
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


    //Proc: se ejecuta en Carga Inicial, inicia filtrando inscriptos "Activos" = 1
    const filtroInicialListado = () =>{
        const listadoFiltrado = listadoInscriptosMov.filter((inscriptos)=>inscriptos.id_tipo_inscripto===1);

        setFilterListadoInscriptosMov(listadoFiltrado);
    };

    //-----------PROCESOS DE BUSQUEDA EN LISTADO INSCRIPTOS------------
    //Escribir dentro del input de busqueda
    const handleInputSearchChange = (event) =>{
        const {value} = event.target;
        setInputSearch(value);
    };

    //Presiono boton Cancelar (X) dentro de input busqueda
    const handleCancelSearch=async()=>{
        //seteoFiltrosBusquedaInicio();
        setInputSearch('')
        setCurrentPage(1);
        //setDocRecFilter(docrecSG);
        //aplicoFiltrosListado(listadoInscriptosMov);
        //await getInscriptosMov(idListadoInscriptosMov,currentPage,tipoInscripto,estadoInscripto,'');
    };
    
    //Proc: ejecuta la busqueda, filtrando datos de input busqueda en los campos
    //del listado de inscriptos filtrado
    const submitSearch = async()=>{
        console.log('presiono buscar con este input: ', inputSearch);
        const valorBusqueda = inputSearch;
        // let searchDoc;
        // searchDoc = await filterListadoInscriptosMov.filter(inscripto=>inscripto.nombre.toLowerCase().includes(inputSearch.toLowerCase()) || inscripto.apellido.toLowerCase().includes(inputSearch.toLowerCase()) || inscripto.nro_escuela.toLowerCase().includes(inputSearch.toLowerCase()) || inscripto.dni.includes(inputSearch));
        // setFilterListadoInscriptosMov(searchDoc);
        //await getInscriptosMov(idListadoInscriptosMov,currentPage,tipoInscripto,estadoInscripto,valorBusqueda);
    };    
    //-------------------------------------------------------------------

    //-----------PROCESOS DE BUSQUEDA EN VACANTES DISPONIBLES------------
    //Escribir dentro del input de busqueda
    const handleInputSearchVacChange = (event) =>{
        const {value} = event.target;
        setInputSearchVac(value);
        setCampoOrderVac('');
    };

    const busquedaDinamica=()=>{
        if(inputSearchVac!=''){
            submitSearchVac();
        }else{
            setFilterListadoVacantesDispMov(listadoVacantesDispMov);
        }
    };

    //Presiono boton Cancelar (X) dentro de input busqueda
    const handleCancelSearchVac = async()=>{
        setInputSearchVac('')
        setFilterListadoVacantesDispMov(listadoVacantesDispMov);
        //setDocRecFilter(docrecSG);
        //aplicoFiltrosListado(listadoInscriptosMov);
    };
    
    //Proc: ejecuta la busqueda, filtrando datos de input busqueda en los campos
    //del listado de Vacantes Disponibles
    const submitSearchVac = async()=>{
        //console.log('presiono buscar con este input: ', inputSearch);
        let searchVac;
        searchVac = await listadoVacantesDispMov.filter(vacante=>vacante.establecimiento.toLowerCase().includes(inputSearchVac.toLowerCase()) || vacante.cargo.toLowerCase().includes(inputSearchVac.toLowerCase()) || vacante.modalidad.toLowerCase().includes(inputSearchVac.toLowerCase()) || vacante.turno.toLowerCase().includes(inputSearchVac) || vacante.region.toLowerCase().includes(inputSearchVac) || vacante.localidad.toLowerCase().includes(inputSearchVac));
        setFilterListadoVacantesDispMov(searchVac);
    };    
    //-------------------------------------------------------------------    

    //Proc: Al presionar sobre uno de los encabezados en el icono Ordenar
    const submitOrderVac = (campo_order)=>{
        //seteo vacio campo busqueda
        setInputSearchVac('')
        setCampoOrderVac(campo_order);
        if(campo_order==='establecimiento'){
            if(order){
                //ordenar Descencente
                const sortVac = [...filterListadoVacantesDispMov].sort((a,b)=>{
                    return a.establecimiento>b.establecimiento ?1 :-1;
                });
                setFilterListadoVacantesDispMov(sortVac);
            }else{
                //Ordernar Ascendente
                const sortVac = [...filterListadoVacantesDispMov].sort((a,b)=>{
                    return a.establecimiento<b.establecimiento ?1 :-1;
                });
                setFilterListadoVacantesDispMov(sortVac);
            }
        }else if(campo_order==='localidad'){
            if(order){
                //ordenar Descencente
                const sortVac = [...filterListadoVacantesDispMov].sort((a,b)=>{
                    return a.localidad<b.localidad ?1 :-1;
                });
                setFilterListadoVacantesDispMov(sortVac);
            }else{
                //Ordernar Ascendente
                const sortVac = [...filterListadoVacantesDispMov].sort((a,b)=>{
                    return a.localidad>b.localidad ?1 :-1;
                });
                setFilterListadoVacantesDispMov(sortVac);
            }
        }else if(campo_order==='zona'){
            if(order){
                //ordenar Descencente
                const sortVac = [...filterListadoVacantesDispMov].sort((a,b)=>{
                    return a.zona>b.zona ?1 :-1;
                });
                setFilterListadoVacantesDispMov(sortVac);
            }else{
                //Ordernar Ascendente
                const sortVac = [...filterListadoVacantesDispMov].sort((a,b)=>{
                    return a.zona<b.zona ?1 :-1;
                });
                setFilterListadoVacantesDispMov(sortVac);
            }
        }
    };

    //Proc: Al presionar sobre icono Ver Vacantes Disponibles
    const submitVerVacantes = (datos) =>{
        //vacion input busqueda
        setInputSearchVac('')
        console.log('que recibe datos inscripto al Ver Vacantes: ', datos);
        setDatosInscriptoSelect(datos);
        //cargo listado original de vacantes disponibles
        setFilterListadoVacantesDispMov(listadoVacantesDispMov);
        openModalVac();
    };

    //Proc prsiona sobre icono asignar en Vacantes disponibles
    const submitAsignar = (vacante)=>{
        console.log('datos recibidos de Vacante: ', vacante);
        setDatosVacanteSelect(vacante);
        openModalAsign();
    };

    //?---------------------------------------------------------------
    //?  -  -  -  PROCESO DE ASIGNACION
    //?---------------------------------------------------------------
    const submitAsignarVacante = async() => {
        if(datosInscriptoSelect.id_vacante_generada_cargo_actual === datosVacanteSelect.id_vacante_mov){
            setMensajeModalInfo('No puede seleccionar la misma vacante de su cargo original, seleccione otra vacante');
            openModal();
        }else{

            console.log('Asignacion Simple');
    
            const fechaHoraActual = await traeFechaHoraActual();
            const formAsignacion={
                id_vacante_mov:datosVacanteSelect.id_vacante_mov, 
                id_inscripto_mov:datosInscriptoSelect.id_inscriptos_mov, 
                datetime_asignacion:fechaHoraActual, 
                id_estado_asignacion:1 //estado Asignada
            }
            console.log('como arma form para Asignacion: ', formAsignacion);
            await axios.post(`${URL}/api/createasignacionmov`,formAsignacion)
                .then(async res=>{
                    console.log('que trae res de createasignacionmov: ', res);
                    //?Verifico que tipo de Asignacion es
                    if(datosInscriptoSelect.id_tipo_inscripto===1){
                        //?INSCRIPTO EN DISPONIBILIDAD -> Solo Asigna Vacante a Inscripto
                        //Mostrar Notificacion de Movimiento realizado
                        //setMensajeModalInfo('Movimiento Asignado Correctamente')
                        //openModal();
                        setMensajeModalConfirm('Movimiento Asignado Correctamente, ¿Imprime Designacion?');
                        openModalConfirm();
                    }else{
                        //?INSCRIPTO ACTIVO -> Una vez asignada vacante, deebe Generar Nueva Vacante del cargo que deja el inscripto
                        //?SOLO CREA NUEVA VACANTE SI NO ESTA GENERADA -> id_vacante_generada_cargo_actual IS NULL
                        if(datosInscriptoSelect.id_vacante_generada_cargo_actual===null){
                            creaNuevaVacante();
                        }else{
                            // setMensajeModalInfo('Movimiento Asignado Correctamente')
                            // openModal();
                            setMensajeModalConfirm('Movimiento Asignado Correctamente, ¿Imprime Designacion?');
                            openModalConfirm();
                        }
    
                    }
                })
                .catch(error=>{
                    console.log('que trae error createasignacionmov: ', error)
                });
    
            //Al final del Proceso de Asignacion recargo el listado de Vacantes Disponibles
            await buscoIDListadoVacantes(configSG.nivel.id_nivel);
        }
    };

    const creaNuevaVacante = async() => {
        //Creo una nueva Vacante con los datos del cargo que deja el Inscripto
        //id_listado_vac_mov, orden, establecimiento, obs_establecimiento, region, departamento, localidad, cargo, turno, modalidad, cupof, id_especialidad, datetime_creacion, zona
        const fechaHoraActualNuevaVac = await traeFechaHoraActual();
        const formNuevaVacante={
            id_listado_vac_mov:idListVacMov, //INT
            orden:null,  //INT
            establecimiento:datosInscriptoSelect.nro_escuela, //VARCHAR
            obs_establecimiento:'', //VARCHAR
            region:'', //VARCHAR
            departamento:'', //VARCHAR
            localidad:'', //VARCHAR
            cargo:datosInscriptoSelect.cargo_actual, //VARCHAR
            turno:'', //VARCHAR
            modalidad:'', //VARCHAR
            cupof:'', //VARCHAR
            id_especialidad:null, //INTEGER
            datetime_creacion:fechaHoraActualNuevaVac, //VARCHAR
            zona:'' //VARCHAR
        }
        console.log('como arma formBody para Nueva Vacante: ', formNuevaVacante);
        await axios.post(`${URL}/api/vacantemov`,formNuevaVacante)
        .then(async res=>{
            console.log('que trae res de createVacantesMov: ', res);
            //Mostrar Notificacion de Movimiento realizado
            //Una vez creada la vacante, se debe actualizar el id_vacante_mov generada del cargo que dejo el inscripto
            const idVacanteGenerada = res.data.id_vacantes_mov;
            console.log('cual es el id de la vacante creada: ', idVacanteGenerada);

            const resUpdIdVacGen = await updateIdVacanteGenerada(datosInscriptoSelect.id_inscriptos_mov,idVacanteGenerada);
            console.log('que trae resUpdIdVacGen: ', resUpdIdVacGen);

            // setMensajeModalInfo('Movimiento Asignado Correctamente')
            // openModal();
            setMensajeModalConfirm('Movimiento Asignado Correctamente, ¿Imprime Designacion?');
            openModalConfirm();
        })
        .catch(error=>{
            console.log('que trae error createVacantesMov: ', error)
        });
        //Al final del Proceso de Asignacion recargo el listado de Vacantes Disponibles
        await buscoIDListadoVacantes(configSG.nivel.id_nivel);
    };

    //Proceso para Imprimir la designacion
    const procesoImpresion = async()=>{
        console.log('ingresa a Impresion');
        await handlePrint();
    };

    //?---------------------------------------------------------------


    const traeFechaHoraActual = () => {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11, por eso se suma 1
        const day = String(now.getDate()).padStart(2, '0');
    
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };


    const submitEliminarTomaCargo = async(idAsignacion) =>{
        console.log('que trae idAsignacion: ', idAsignacion);
        const fechaHoraActual = traeFechaHoraActual();
        const datosBody={
            obsDesactiva:`Se desactiva la Asignacion por Eliminacion ${fechaHoraActual}`
        }

        try{
            await axios.post(`${URL}/api/delasignacionmov/${idAsignacion}`,datosBody)
            .then(async res=>{
                console.log('que trae res de delasignacionmov: ', res);
                //Mostrar Notificacion de Eliminacion de Asignacion
                setMensajeModalInfo('Toma de Cargo Eliminada');
                openModal();
            })
            .catch(error=>{
                console.log('que trae error createVacantesMov: ', error)
            });

        }catch(error){
            console.error(error.message);
        }
        //Al final del Proceso de Eliminar Asignacion recargo el listado de Vacantes Disponibles
        await buscoIDListadoVacantes(configSG.nivel.id_nivel);
    };

    //Proc: elimina una vacante de movimiento generada por toma de cargo
    //- Eliminar vacante de vacantes_mov
    //- Actualizar inscriptos_mov en su campo: id_vacante_generada_cargo_actual a NULL
    const submitEliminarVacanteMov = async(idVacanteMov)=>{
        console.log('que trae idVacanteMo: ', idVacanteMov);
        const fechaHoraActual = traeFechaHoraActual();
        const datosBody={
            obsDesactiva:`Se desactiva la VACANTE por Eliminacion ${fechaHoraActual}`
        }
        try{
            await axios.put(`${URL}/api/delvacantemov/${idVacanteMov}`,datosBody)
            .then(async res=>{
                console.log('que trae res de delvacantemov: ', res);
                //Actualizar campo id_vacante_generada_cargo_actual en Inscriptos_mov
                const idVacanteGenerada=null;
                const resUpdIdVacGen = await updateIdVacanteGenerada(datosInscriptoSelect.id_inscriptos_mov,idVacanteGenerada);
                console.log('que trae resUpdIdVacGen: ', resUpdIdVacGen);

                //Mostrar Notificacion de Eliminacion de Vacante
                setMensajeModalInfo('Vacante Eliminada');
                openModal();
            }).catch(error=>{
                console.log('que trae error delvacantemov: ', error)
            });
            
        }catch(error){
            console.error(error.message);
        }
        //Al final del Proceso de Eliminar Vacante recargo el listado de Vacantes Disponibles
        await buscoIDListadoVacantes(configSG.nivel.id_nivel);
    };

    const handlePageChange = (nuevaPagina)=>{
        if(nuevaPagina>0 && nuevaPagina<=paginacion?.totalPages){
            setCurrentPage(nuevaPagina);
        };
    };


    const handlePrint = useReactToPrint({
        content:() => componentRef.current,
        pageStyle:`
        @page {
          size: LEGAL; /* Tamaño del papel */
          orientation: portrait; /* Orientación vertical */
        }
      `,
    });

    const submitCloseModalConfirm = () =>{

        closeModalConfirm();
        closeModalAsign();
        closeModalVac();
        getInscriptosMov(idListadoInscriptosMov,currentPage,tipoInscripto,estadoInscripto,inputSearch);
    };



    useEffect(()=>{
        //recargo listado de inscriptos con la nueva pagina
        getInscriptosMov(idListadoInscriptosMov,currentPage,tipoInscripto,estadoInscripto,inputSearch);
    },[currentPage])

    //A medida que se escribe en el Input de BUsqueda de Vacantes Disponibles se ejecuta
    //la busqueda filtrando el listado de vacantes
    useEffect(()=>{
        busquedaDinamica();
    },[inputSearchVac])

    // useEffect(()=>{
    //     console.log('que tiene campo inputSearch: ', inputSearch);
    // },[inputSearch])

    //Al setear en E.L los datos del inscripto seleccionado
    useEffect(()=>{
        //llamo a Proc para cargar valores iniciales en formInscripto y estadoForm en "ver"
        valoresInicialesFormInscripto();
    },[datosInscriptoSelect]);

    useEffect(()=>{
        console.log('como queda el listado filtrado filterListadoInscriptosMov: ', filterListadoInscriptosMov);
    },[filterListadoInscriptosMov])

    //Al setear algun FILTRO o si listadoInscripto se recarga por modificacion de datos
    // useEffect(()=>{
    //     console.log('APLICO FILTRO')
    //     console.log('que tiene estado local tipoInscripto: ', tipoInscripto);
    //     console.log('que tiene estado local estadoInscripto: ', estadoInscripto);

    //     //aplicoFiltrosListado(listadoInscriptosMov);

    // },[listadoInscriptosMov,tipoInscripto, estadoInscripto]);

    //APLICO FILTROS de tipoInscripto (Activos / Disponibilidad), estadoInscripto(todos/sinasignar/asignados) y busquedadinamica(inputSearch)
    useEffect(()=>{
        console.log('APLICO FILTRO')
        getInscriptosMov(idListadoInscriptosMov,currentPage,tipoInscripto,estadoInscripto,inputSearch);
    },[tipoInscripto,estadoInscripto,inputSearch])


    useEffect(()=>{
        console.log('que tiene asignacionCargoOriginal: ', asignacionCargoOriginal);
    },[asignacionCargoOriginal])


    //VEO EL LISTADO DE VACANTES DE MOVIMIENTO
    useEffect(()=>{
        //?PROCESO SE EJECUTA EN CARGA INICIAL
        console.log('que tiene listadoVacantesMov (CARGA INICIAL): ', listadoVacantesDispMov);
    },[listadoVacantesDispMov])

    //VEO EL LISTADO DE INSCRIPTOS DE MOVIMIENTO
    useEffect(()=>{
        console.log('que tiene listadoInscriptosMov (CARGA INICIAL): ', listadoInscriptosMov);
        //?PROCESO SE EJECUTA EN CARGA INICIAL
        //NI BIEN CARGO EL LISTADO DE INSCRIPTOS FILTRO CON ESTADO ACTIVO
        //FILTRO EL LISTADO DE INSCRIPTOS DE MOVIMIENTO
        filtroInicialListado();
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
        buscoIdlistadoInscrip(configSG.nivel.id_nivel);
        //LLAMO AL PROCEDIMIENTO buscoIDListadoVacantes Y PASO EL NIVEL CARGADO EN STORE GLOBAL
        buscoIDListadoVacantes(configSG.nivel.id_nivel);

    },[]);

    return(
        <div className=" notranslate h-full w-full">
            {/* ENCABEZADO DE PAGINA */}
            <div className="bg-[#C9D991] h-[12vh] flex flex-row">
                {/* TITULOS - BOTONES - NIVEL */}
                <div className="w-[45vw] flex justify-center items-start flex-col">
                    <label className="ml-4 text-base font-semibold">NIVEL {configSG.nivel.descripcion}</label>
                    <div className="flex flex-row">
                        <label className="ml-4 text-lg font-sans font-bold">INSCRIPTOS - LUOM</label>
                    </div>
                    <div className="flex flex-row">
                        <button 
                            className={`ml-4 mr-2 px-[2px] border-[1px] rounded shadow 
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
                                    <FaSearch 
                                        className="text-zinc-500 cursor-pointer mr-2"
                                        onClick={()=>submitSearch()}
                                    />
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
                                    <th className="border-r-[1px] border-zinc-300">Escuela</th>
                                    <th className="border-r-[1px] border-zinc-300">Cargo Actual</th>
                                    <th className="border-r-[1px] border-zinc-300">Cargo Solicitado</th>
                                    <th className="border-r-[1px] border-zinc-300">Observacion</th>
                                    <th className="">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // filterListadoInscriptosMov?.map((inscripto, index)=>{
                                    listadoInscriptosMov?.map((inscripto, index)=>{
                                        const colorFila = inscripto.vacante_asignada ?`bg-red-200` :(((inscripto.id_inscriptos_mov % 2)===0) ?`bg-zinc-200` :``)
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
                                                <td>{inscripto.nro_escuela}</td>
                                                <td className="text-center">{inscripto.cargo_actual}</td>
                                                <td className="text-center">{inscripto.cargo_solicitado}</td>
                                                <td className="text-sm">{inscripto.observacion}</td>
                                                <td>
                                                    <div className="flex flex-row items-center justify-center  ">
                                                        {(inscripto.vacante_asignada===null && inscripto.id_vacante_generada_cargo_actual!=null)
                                                            ?<FiAlertTriangle    
                                                                className="mr-2 blink text-red-500"
                                                                />
                                                            :``
                                                        }
                                                        <FaEye 
                                                            className="hover:cursor-pointer hover:text-[#83F272]" 
                                                            title="Ver Datos"
                                                            onClick={()=>submitVerDatosInscripto(inscripto)}
                                                        />
                                                        {
                                                            (inscripto.vacante_asignada===null || inscripto.vacante_asignada==='')
                                                            ?<BiTransferAlt 
                                                                className="text-2xl hover:cursor-pointer hover:text-[#83F272] ml-2"      
                                                                title="Vacantes"
                                                                onClick={()=>submitVerVacantes(inscripto)}
                                                            />
                                                            :``
                                                        }
                                                        
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
        
        
        {/* MODAL DE VACANTES DISPONIBLES*/}
        <ModalEdit isOpen={isOpenModalVac} closeModal={closeModalVac}>
            <div className="h-100 w-100  flex flex-col items-center">
                <label className="text-xl text-center font-bold " translate='no'>VACANTES DISPONIBLES</label>
                {/* DATOS DEL INSCRIPTO */}
                <div className="border-[1px] border-zinc-300  flex justify-center rounded-md shadow font-semibold">
                    <label className="mx-4 text-zinc-500">Docente: {datosInscriptoSelect.apellido} {datosInscriptoSelect.nombre}</label>
                    <label className="mr-4 text-red-400">Cargo Origen: {datosInscriptoSelect.cargo_actual}</label>
                    <label className="mr-4 text-sky-500">Cargo Solicitado: {datosInscriptoSelect.cargo_solicitado}</label>
                </div>
                <div className="h-[60vh] w-[90vw] mt-2 ">
                    {/* PARTE SUPERIOR - FILTROS Y BUSQUEDA */}
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
                                    <FaSearch 
                                        className="text-zinc-500 cursor-pointer mr-2"
                                        onClick={()=>submitSearchVac()}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* ORDENAMIENTO POR CAMPOS SEGUN FILTRO BUSQUEDA */}
                        <div className="flex flex-row">
                            <div className="flex flex-row items-center justify-center w-[2vw] border-r-[1px] border-zinc-200 hover:text-sky-500">
                                <label className="font-base">ID</label>
                            </div>
                            <div 
                                className={`flex flex-row items-center justify-center w-[15vw] border-r-    [1px] border-zinc-200 hover:text-sky-500  cursor-pointer
                                    ${(campoOrderVac==='establecimiento')
                                        ?`text-sky-500`
                                        :``
                                    }`}
                                onClick={()=>{submitOrderVac('establecimiento');setOrder(!order)}}
                            >
                                <label className="font-semibold cursor-pointer">Escuela</label>
                                {
                                    (campoOrderVac==='establecimiento') &&
                                    <div>
                                        {(order)
                                            ?<TbSortDescending className=" ml-2 cursor-pointer"/>
                                            :<TbSortAscending className=" ml-2 cursor-pointer"/>
                                        }
                                    </div>
                                }
                                {
                                    (campoOrderVac!='establecimiento') &&
                                    <LuArrowUpDown 
                                        className="ml-2 cursor-pointer"
                                    />
                                }
                                
                            </div>
                            <div className="flex flex-row items-center justify-center w-[10vw] border-r-[1px] border-zinc-200">
                                <label className="font-semibold">Cargo</label>
                                {/* <LuArrowUpDown className="ml-2"/> */}
                            </div>
                            <div className="flex flex-row items-center justify-center w-[13vw] border-r-[1px] border-zinc-200">
                                <label className="font-semibold">Modalidad</label>
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
                            <div 
                                className={`flex flex-row items-center justify-center w-[15vw] border-r-    [1px] border-zinc-200 hover:text-sky-500 cursor-pointer
                                    ${(campoOrderVac==='localidad')
                                        ?`text-sky-500`
                                        :``
                                    }`}
                                    onClick={()=>{submitOrderVac('localidad');setOrder(!order)}}
                            >
                                <label className="font-semibold cursor-pointer">Localidad</label>
                                {
                                    (campoOrderVac==='localidad') &&
                                    <div>
                                        {(order)
                                            ?<TbSortDescending className="ml-2 cursor-pointer"/>
                                            :<TbSortAscending className="ml-2 cursor-pointer"/>
                                        }
                                    </div>
                                }
                                {
                                    (campoOrderVac!='localidad') &&
                                    <LuArrowUpDown 
                                        className="ml-2 cursor-pointer"
                                    />
                                }
                            </div>
                            <div 
                                className={`flex flex-row items-center justify-center w-[8vw] border-r-    [1px] border-zinc-200 hover:text-sky-500 cursor-pointer
                                    ${(campoOrderVac==='zona')
                                        ?`text-sky-500`
                                        :``
                                    }`}
                                    onClick={()=>{submitOrderVac('zona');setOrder(!order)}}
                            >
                                <label className="font-semibold cursor-pointer">Zona</label>
                                {
                                    (campoOrderVac==='zona') &&
                                    <div>
                                        {(order)
                                            ?<TbSortDescending className="ml-2 cursor-pointer"/>
                                            :<TbSortAscending className="ml-2 cursor-pointer"/>
                                        }
                                    </div>
                                }
                                {
                                    (campoOrderVac!='zona') &&
                                    <LuArrowUpDown 
                                        className="ml-2 cursor-pointer"
                                    />
                                }
                            </div>
                            <div className="flex flex-row items-center justify-center w-[8vw] ">
                                <label className="font-semibold">Acciones</label>
                            </div>
                        </div>
                    </div>

                    {/* PARTE INFERIOR - DATOS DE TABLA */}
                    <div className="w-full h-[52vh] overflow-y-auto border-[1px] border-zinc-400 rounded-b-lg border-t-0">
                        <table className="">
                            {/* <thead>
                                <tr className="text-sm border-b-[1px] border-zinc-300">
                                    <th className="border-r-[1px] border-zinc-300">Escuela</th>
                                    <th className="border-r-[1px] border-zinc-300">Cargo</th>
                                    <th className="border-r-[1px] border-zinc-300">Modalidad</th>
                                    <th className="border-r-[1px] border-zinc-300">Turno</th>
                                    <th className="border-r-[1px] border-zinc-300">Region</th>
                                    <th className="border-r-[1px] border-zinc-300">Localidad</th>
                                    <th className="border-r-[1px] border-zinc-300">Zona</th>
                                </tr>
                            </thead> */}
                            <tbody>
                                {
                                    filterListadoVacantesDispMov?.map((vacante, index)=>{
                                        return(
                                            <tr
                                                className={`text-lg font-medium border-b-[1px] border-zinc-300 h-[5vh] hover:bg-orange-300 `}
                                                        key={index}
                                            >
                                                <td className="w-[2vw] pl-[4px] font-light">{vacante.id_vacante_mov
                                                }</td>
                                                <td className="w-[15vw] pl-[4px] text-center">{vacante.establecimiento} - {vacante.obs_establecimiento}</td>
                                                <td className="w-[10vw] pl-[4px] text-center">{vacante.cargo}</td>
                                                <td className="w-[13vw] pl-[4px] text-center">{vacante.modalidad}</td>
                                                <td className="w-[10vw] pl-[4px]">{vacante.turno}</td>
                                                <td className="w-[10vw] pl-[4px] text-center">{vacante.region}</td>
                                                <td className="w-[15vw] pl-[4px] text-center">{vacante.localidad}</td>
                                                <td className="w-[8vw] pl-[4px] text-center">{vacante.zona}</td>
                                                <td className="w-[8vw]">
                                                    <div className="flex flex-row items-center justify-center">
                                                        {/* <FaEye 
                                                            className="mr-2 hover:cursor-pointer hover:text-[#83F272]" 
                                                            title="Ver Datos"
                                                            //onClick={()=>submitVerDatosInscripto(inscripto)}
                                                        /> */}
                                                        <BiTransferAlt 
                                                            className="text-2xl hover:cursor-pointer hover:text-[#83F272]"      title="Asignacion"
                                                            onClick={()=>submitAsignar(vacante)}
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
                <div>
                    <button
                        className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                        onClick={closeModalVac}
                        translate='no'
                    >CERRAR</button>
                </div>
            </div>
        </ModalEdit>

        {/* MODAL DE ASIGNACION */}
        <ModalEdit isOpen={isOpenModalAsign} closeModal={closeModalAsign}>
            <div className="h-100 w-100  flex flex-col items-center">
                <label 
                    className="text-xl text-center font-bold " 
                    translate='no'
                >
                {`ASIGNACION VACANTE (
                    ${datosInscriptoSelect.tipoinscripto} ) `}
                </label>
                {/* DATOS DEL INSCRIPTO */}
                <div className="border-[1px] border-purple-400 flex flex-col justify-center rounded-md shadow font-semibold text-lg bg-purple-100 mb-2">
                    <div className="flex flex-row">
                        <label className="mx-4 text-zinc-800">Docente: {datosInscriptoSelect.apellido} {datosInscriptoSelect.nombre}</label>
                        <label className="mr-4 text-zinc-800">DNI: {datosInscriptoSelect.dni}</label>
                        <label className="mr-4 text-zinc-800">Puntaje: {datosInscriptoSelect.total}</label>
                    </div>
                </div>
                {/* DATOS DE LOS CARGOS */}
                <div className="flex flex-row h-[54vh] w-[50vw]">
                    {/* CARGO ORIGEN */}
                    <div className="flex flex-col border-[5px] border-red-500 w-[50%] items-center m-y-[4px] rounded-md shadow-lg bg-red-100">
                        <label className="font-bold text-lg">ANTES</label>
                        <div>
                            <label className="mb-0 font-semibold text-sm ">Escuela</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosInscriptoSelect.nro_escuela}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Cargo</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosInscriptoSelect.cargo_actual}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Modalidad</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50"></div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Turno</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50"></div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Region</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50"></div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Localidad</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50"></div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Zona</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <MdOutlineDoubleArrow className="text-2xl animate-left-disappear"/>
                    </div>
                    {/* CARGO A TOMAR */}
                    <div className="flex flex-col border-[5px] border-emerald-500 w-[50%] items-center items-center m-y-[4px] ml-[9px] rounded-md shadow-lg bg-emerald-100">
                        <label className="font-bold text-lg">DESPUES</label>
                        <div>
                            <label className="mb-0 font-semibold text-sm ">Escuela</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.establecimiento} {datosVacanteSelect.obs_establecimiento}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Cargo</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.cargo}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Modalidad</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.modalidad}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Turno</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.turno}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Region</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.region}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Localidad</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.localidad}</div>
                        </div>
                        <div>
                            <label className="font-semibold text-sm">Zona</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.zona}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                        onClick={()=>submitAsignarVacante()}
                        translate='no'
                    >ACEPTAR</button>
                    <button
                        className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                        onClick={closeModalAsign}
                        translate='no'
                    >CANCELAR</button>
                    <button
                        onClick={()=>procesoImpresion()}
                    >imprimir (test)</button>
                </div>                
            </div>
        </ModalEdit>

        
        {/* MODAL DE DATOS DEL INSCRIPTO */}
        <ModalEdit isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
            <div className="h-100 w-100  flex flex-col items-center">
                <label className="text-xl text-center font-semibold " translate='no'>DATOS DEL INSCRIPTO</label>
                <div className="min-h-[32vh] min-w-[50vw] mt-2 border-[1px] border-sky-800 rounded">
                    <div className="flex flex-row ml-2 mt-2">
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
                    <div className="flex flex-row ml-2 mt-4">
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
                                className="border-[1px] border-zinc-400 w-[30mm] pl-[2px]"
                                value={formInscripto.dni}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Cargo Solicitado</label>
                            <input 
                                name="cargo_solicitado"
                                className="border-[1px] border-zinc-400 w-[48mm] pl-[2px]"
                                value={formInscripto.cargo_solicitado}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Legajo</label>
                            <input 
                                name="legajo"
                                className="border-[1px] border-zinc-400 w-[31mm] pl-[2px]"
                                value={formInscripto.legajo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row ml-2 my-4">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Observaciones</label>
                            <input 
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px]"
                                value={formInscripto.observacion}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mx-2 my-4">
                        <label className="text-sm font-semibold">Cargo que dejo</label>
                        <div className="flex flex-row border-[1px] border-orange-500 rounded p-2 bg-orange-50">
                            <div className="flex flex-col mr-2 ">
                                <label className="text-sm">Cargo Actual</label>
                                <input 
                                    name="cargo_actual"
                                    className="border-[1px] border-orange-400 w-[45mm] pl-[2px]"
                                    value={formInscripto.cargo_actual}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col mx-2">
                                <label className="text-sm">Escuela</label>
                                <input 
                                    name="nro_escuela"
                                    className="border-[1px] border-orange-400 w-[77mm] pl-[2px]"
                                    value={formInscripto.nro_escuela}
                                    onChange={handleChange}
                                />
                            </div>
                            {
                                (datosInscriptoSelect.id_vacante_generada_cargo_actual!=null)
                                ?<div className="flex flex-col mr-2">
                                    <label className="text-sm">N° Vac</label>
                                    <input 
                                        name="nro_escuela"
                                        className="border-[1px] border-orange-400 w-[10mm] pl-[2px]"
                                        value={datosInscriptoSelect.id_vacante_generada_cargo_actual}
                                        onChange={handleChange}
                                    />
                                </div>
                                :``
                            }
                            {
                                (datosInscriptoSelect.vacante_asignada===null && datosInscriptoSelect.id_vacante_generada_cargo_actual!=null && asignacionCargoOriginal.length===0)
                                ?<div className="flex flex-col mx-2 justify-center">
                                    <IoTrash 
                                        className="font-bold text-xl text-red-500 hover:scale-150 transition-all duration-500 blink cursor-pointer"
                                        title="Eliminar Vacante Generada"
                                        onClick={()=>submitEliminarVacanteMov(datosInscriptoSelect.id_vacante_generada_cargo_actual)}
                                    />
                                </div>
                                :``
                            }
                        </div>

                    </div>
                    
                </div>
                {/* AVISO DE ALERTA */}
                {
                    (datosInscriptoSelect.vacante_asignada===null && datosInscriptoSelect.id_vacante_generada_cargo_actual!=null)
                    ?(asignacionCargoOriginal.length!=0)
                        ?<div className="w-[50vw]">
                            <label className="text-red-500 font-semibold ">Realice Toma de Cargo de Vacante Disponible. Si va a quedarse con su Cargo Original, elimine la asignacion del docente que tomo su cargo original.</label>
                        </div>
                        :<div className="w-[50vw]">
                            <label className="text-red-500 font-semibold ">Su Cargo Original genero una Vacante Disponible, elimine la vacante generada o realice Toma de Cargo de una Vacante</label>
                        </div>
                    :``
                }


                {/* DATOS DE CARGO TOMADO - SI SE LE ASIGNO VACANTE */}
                {(datosInscriptoSelect.vacante_asignada!=null && datosInscriptoSelect.vacante_asignada!='') &&
                <div className="h-[19vh] min-w-[50vw] mt-5 border-[1px] border-emerald-500 text-center rounded bg-emerald-50">
                <div className="flex flex-row ">
                    <div className="w-[20%] "></div>
                    <div className="w-[60%] ">
                        <label className="text-xl text-center font-bold text-green-700" translate='no'>Cargo que tomó</label>
                    </div>
                    <div className="flex flex-row w-[20%] justify-end">
                        <button className="font-bold text-xl mr-2 hover:text-sky-500 hover:scale-150 transition-all duration-500">
                            <IoMdPrint 
                                title="IMPRIMIR DESIGNACION"
                                onClick={()=>procesoImpresion()}
                            />
                        </button>
                        <button className="font-bold text-lg mr-4 hover:text-red-500 hover:scale-150 transition-all duration-500">
                            <IoTrash 
                                title="ELIMINAR"
                                onClick={()=>submitEliminarTomaCargo(cargoAsignado.id_asignacion_mov)}
                            />
                        </button>
                    </div>
                </div>
                    {/* Datos a mostrar: Escuela, cargo, modalidad, turno, region, localidad, zona */}
                    <div className="flex flex-row">
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">ID Vacante</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[6vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.id_vacante_mov}</div>
                        </div>
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Escuela</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.establecimiento} {cargoAsignado.obs_establecimiento}</div>
                        </div>
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Cargo</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[10vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.cargo}</div>
                        </div>
                        <div className="text-start mx-2">
                            <label className="font-semibold text-sm">Modalidad</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[10vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.modalidad}</div>
                        </div>
                    </div>    
                    <div className="flex flex-row">
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Turno</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[8vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.turno}</div>
                        </div>
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Region</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[11vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.region}</div>
                        </div>
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Localidad</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[17vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.localidad}</div>
                        </div>
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Zona</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[10vw] h-[4vh] pl-[4px] bg-neutral-50">{cargoAsignado.zona}</div>
                        </div>
                    </div>
                </div>
                }

                {/* DATOS DE CARGO ORIGINAL TOMADO POR OTRO DOCENTE */}
                {/* Solo se muestra si su cargo original fue tomado por otro docente */}
                {(datosInscriptoSelect.id_tipo_inscripto!=1 && asignacionCargoOriginal.length!=0) &&
                <div className="h[10vh] min-w-[50vw] mt-5 border-[2px] border-orange-500 text-center rounded">
                <label className="text-xl text-center font-semibold " translate='no'>Docente que tomo su Cargo Original</label>
                
                {/* datos a mostrar: id vacante creada, id_inscripto que tomo su cargo, apellido, nombre, dni */}
                    <div className="flex flex-row mb-2">
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Id Vacante</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[6vw] h-[4vh] pl-[4px]">{asignacionCargoOriginal[0].id_vacante_mov}</div>
                        </div>
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Apellido</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[15vw] h-[4vh] pl-[4px] ">{asignacionCargoOriginal[0].apellido}</div>
                        </div>
                        <div className="text-start ml-2">
                            <label className="font-semibold text-sm">Nombre</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[15vw] h-[4vh] pl-[4px] ">{asignacionCargoOriginal[0].nombre}</div>
                        </div>
                        <div className="text-start mx-2">
                            <label className="font-semibold text-sm">Dni</label>
                            <div className="mt-[-4px] border-[1px] border-zinc-500 rounded w-[10vw] h-[4vh] pl-[4px] ">{asignacionCargoOriginal[0].dni}</div>
                        </div>
                    </div>    
                </div>
                }                

                {/* VISIBILIDAD DE BOTONES */}
                <div className="flex justify-center">
                    {(estadoForm==='ver') &&
                        <button
                            className="border-2 border-[#7C8EA6] mt-5 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                            onClick={closeModalEdit}
                            translate='no'
                        >CERRAR</button>
                    }
                    {(estadoForm==='editar') &&
                        <div>
                            <button
                                className="border-2 border-[#7C8EA6] mt-5 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={()=>submitGuardarCambiosFormInscripto()}
                                translate='no'
                            >GUARDAR</button>
                            <button
                                className="border-2 border-[#7C8EA6] mt-5 font-semibold w-40 h-8 bg-[#7C8EA6] text-white hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={()=>valoresInicialesFormInscripto()}
                                translate='no'
                            >CANCELAR</button>
                        </div>
                    }

                </div>

            </div>
        </ModalEdit>

        {/* MODAL DE NOTIFICACION Y CONFIRMACION DE IMPRESION DESIGNACION */}
        <ModalEdit isOpen={isOpenModalConfirm} closeModal={closeModalConfirm}>
            <div className="mt-10 w-[30vw] flex flex-col items-center">
                <h1 className="text-xl text-center font-bold">{mensajeModalConfirm}</h1>
                <div className="flex flex-row">
                    <div className="flex justify-center mr-2">
                        <button
                            className="border-2 border-[#557CF2] mt-10 font-bold w-40 h-8 bg-[#557CF2] text-white hover:bg-sky-300 hover:border-sky-300"
                            onClick={()=>{procesoImpresion(); submitCloseModalConfirm()}}
                        >ACEPTAR</button>
                    </div>
                    <div className="flex justify-center ml-2">
                        <button
                            className="border-2 border-[#557CF2] mt-10 font-bold w-40 h-8 bg-[#557CF2] text-white hover:bg-sky-300 hover:border-sky-300"
                            onClick={()=>submitCloseModalConfirm()}
                        >CANCELAR</button>
                    </div>
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

        {/* PAGINA DE IMPRESION DESIGNACION */}
        <div 
            className="flex flex-col print:page-break-after"
            ref={componentRef}
        >
            <PaginaDesignacion
                datosInscripto={datosInscriptoSelect}
                datosVacante={datosVacanteSelect}
                id_nivel={configSG?.nivel.id_nivel}
            />
            <br/>
            <PaginaDesignacion
                datosInscripto={datosInscriptoSelect}
                datosVacante={datosVacanteSelect}
                id_nivel={configSG?.nivel.id_nivel}
            />
        </div>

        </div>
    )
};

export default InscriptosMov;