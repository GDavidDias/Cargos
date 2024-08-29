import { useEffect, useState } from "react";
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { useSelector } from "react-redux";
import { fetchAllInscriptosMov } from "../../utils/fetchAllInscriptosMov";
import { useNavigate } from "react-router-dom";
import { FaDotCircle, FaSearch, FaEye, FaTimes} from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import {useModal} from '../../hooks/useModal';
import ModalEdit from "../ModalEdit/ModalEdit";


const InscriptosMov = ()=>{
    const[isOpenModal,openModal,closeModal]=useModal(false);
    const configSG = useSelector((state)=>state.config);
    const navigate = useNavigate();

    //PARA PODER FILTRAR LOS LISTADOS SE DETERMINA QUE 
    // disponibilidad -> 1
    // activos -> 2
    const[tipoInscripto, setTipoInscripto]=useState(2);
    const[listadoInscriptosMov, setListadoInscriptosMov]=useState([]);
    const[filterListadoInscriptosMov, setFilterListadoInscriptosMov]=useState([]);
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

    //PRESIONO SOBRE BOTON VER DATOS DEL INSCRIPTO
    const submitVerDatosInscripto = (datos) =>{
        //ENVIO A STORE LOCAL DATOS DE INSCRIPTO PARA MOSTRARLO EN MODAL Y PODER EDITARLOS
        console.log('que recibe datos inscripto: ', datos);
        setDatosInscriptoSelect(datos);
        openModal();
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

    const submitGuardarCambiosFormInscripto = () =>{
        
    };

    useEffect(()=>{
        //CARGA VALORES INICIALES EN formInscripto y coloca estadoForm en 'ver'
        valoresInicialesFormInscripto();
    },[datosInscriptoSelect]);

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
        
        <ModalEdit isOpen={isOpenModal} closeModal={closeModal}>
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
                            onClick={closeModal}
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

        </div>
    )
};

export default InscriptosMov;