import { PiUserListBold, PiListMagnifyingGlassBold  } from "react-icons/pi";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { CgList } from "react-icons/cg";
import logo from '../../assets/JUNTA-04-xs.png';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setNivel, setPage } from "../../redux/configSlice";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaRegUserCircle, FaPowerOff  } from "react-icons/fa";
import { outUser } from "../../redux/userSlice";

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const pageSG = useSelector((state)=>state.config.page);
    const nivelSG = useSelector((state)=>state.config.nivel);
    const userSG = useSelector((state)=>state.user);

    const[open, setOpen]=useState(false);

    const logOut = () =>{
        navigate('/')
        dispatch(outUser());
    };

    const submitInscriptosMov =()=>{
        //
        console.log('Presiona en Inscriptos Movimientos');
        dispatch(setPage('InscriptosMov'));
    };

    const submitVacantesMov =()=>{
        //
        console.log('Presiona en Vacantes Movimientos');
        dispatch(setPage('VacantesMov'))
    };

    const submitAsignaciones = () =>{
        //
        console.log('Presiona en Asignaciones');
        dispatch(setPage('Asignaciones'))
    };

    const submitInscriptosTit = () =>{
        //
        console.log('Presiona en Inscriptos Titularizacion');
        dispatch(setPage('InscriptosTit'))
    };

    const submitVacantesTit = () =>{
        //
        console.log('Presiona en Vacantes Titularizacion');
        dispatch(setPage('VacantesTit'))
    };

    const submitListados = () =>{
        //
        console.log('Presiona en Listados');
        dispatch(setPage('Listados'))
    };

    const submitInscriptosPyR = () =>{
        //
        console.log('Presiona sobre Inscriptos Provisionales y Reemplazantes');
        dispatch(setPage('InscriptosPyR'))
    };

    const submitVacantesPyR = () =>{
        //
        console.log('Presiona sobre Vacantes Provisionales y Reemplazantes');
        dispatch(setPage('VacantesPyR'))
    };


    useEffect(()=>{
        console.log('que tiene pageSG: ', pageSG);
        console.log('que tiene nivelSG: ', nivelSG);
    },[pageSG,nivelSG])

    useEffect(()=>{
        console.log('que tiene userSG: ', userSG);
        if(userSG.id_user===''){
            navigate('/');
        }else{
            if(userSG.permiso===3){
                //Si es un invitado
                dispatch(setPage('VacantesMov'));
            }else{
                dispatch(setPage('InscriptosMov'));
            }
        }
    },[userSG])

    useEffect(()=>{
        setOpen(false);
    },[])

    return(
        <nav>
            {/* MENU MOVIL */}
            <div className="notranslate desktop:hidden bg-[#729DA6] h-[6vh] shadow-md">
                <div className="text-[30px] text-slate-50 flex flex-row justify-between">
                    <IoMdMenu 
                        className="text-slate-50 text-4xl font-bold "
                        onClick={()=>{setOpen(!open)}}
                        //onMouseEnter={()=>{setOpen(!open)}}
                    />
                    <div className="flex flex-row items-center justify-end mr-2">
                        <label className="pr-2 italic text-sm">{userSG.nombre}</label>
                        <FaRegUserCircle className="text-2xl text-slate-50 " />
                        {/* <FaPowerOff 
                        className="mx-2 text-2xl text-[#73685F] hover:cursor-pointer hover:text-[#7C8EA6] transition-transform duration-500 transform hover:scale-125"
                        title="Salir"
                        //onClick={()=>logOut()}
                        /> */}
                    </div>
                    
                </div>
                <div 
                    className={`absolute bg-[#006489] opacity-90 text-[24px] left-0 text-center z-50 w-[100vw] h-[100vh] font-['Helvetica']
                            ${(open)
                                ?` visible`
                                :` invisible`
                            }
                        `}
                    // ref={menuRef}
                >
                    <ul >
                        {/* <li className="my-4 text-slate-50 "
                            //onClick={()=>{handlePage('BoletinPage'); setOpen(false)}}
                            //onClick={()=>{submitNewDoc(); setOpen(false)}}
                            translate='no'
                        >Nuevo Documento</li>
                        <li className="my-8 text-slate-50"
                            //onClick={()=>{handlePage('VerNotasMateriasPage'); setOpen(false)}}
                            //onClick={()=>{submitDocumentosRec(); setOpen(false)}}
                        >Documentos Recibidos</li>
                        <li className="my-8 text-slate-50"
                            //onClick={()=>{handlePage('NotasMateriasPage'); setOpen(false)}}
                            //onClick={()=>{submitDashboard(); setOpen(false)}}
                            translate='no'
                            >Metricas</li> */}
                        <li className="my-8 text-slate-50"
                            //onClick={()=>cierraSesion()}
                            onClick={()=>{logOut(); setOpen(false)}}
                            translate='no'
                        >Salir</li>
                    </ul>
                </div>
            </div>

            {/* MENU ESCRITORIO */}
            <div className="notranslate movil:hidden desktop:flex flex-col bg-[#7C8EA6] w-full h-[95vh] shadow-right-only-md">
                {/* LOGO Y TITULO APP */}
                <div className="h-[8vh] p-[4px] flex flex-row items-center mt-[4px] ml-[4px] " >
                    <div className="flex h-[8vh] w-[30%]">
                        <img src={logo} className="max-w-full max-h-full object-contain"/>
                    </div>
                    <div className="w-[70%] flex flex-col ml-[5px] text-white ">
                        <p style={{lineHeight: '1'}} className="leading-none desktop:text-xs desktop-md:text-base desktop-lg:text-lg " >Sistema Entrega de Cargos</p>
                        {/* <label className="">Sistema </label>
                        <label className="mt-[-8px]">Entrega de </label>
                        <label className="mt-[-6px] font-semibold ">CARGOS</label> */}
                    </div>
                </div>

                {/* MENU MOVIMIENTOS */}
                <div className="ml-2 mt-2 text-white text-base">
                    <label className="font-normal">Traslados y Cambio de Funcion</label>
                    {(userSG.permiso!=3) &&
                        <div 
                            className={` rounded p-[4px] flex flex-row justify-start items-center
                                ${(pageSG==='InscriptosMov')
                                ?'bg-[#C9D991]'
                                :'hover:bg-[#C9D991]'
                            }
                                `}
                            onClick={()=>submitInscriptosMov()}
                        >
                            <PiUserListBold className="text-xl font-bold mr-2"/>
                            <label className="font-light">Inscriptos</label>
                        </div>
                    }

                    <div 
                        className={` rounded p-[4px] flex flex-row justify-start items-center
                            ${(pageSG==='VacantesMov')
                            ?'bg-[#C9D991]'
                            :'hover:bg-[#C9D991]'
                        }
                            `}
                        onClick={()=>submitVacantesMov()}
                    >
                        <PiListMagnifyingGlassBold className="text-xl font-bold mr-2"/>
                        <label className="font-light">Vacantes</label>
                    </div>

                    {(userSG.permiso!=3) &&
                        <div 
                            className={` rounded p-[4px] flex flex-row justify-start items-center
                                ${(pageSG==='Listados')
                                ?'bg-[#C9D991]'
                                :'hover:bg-[#C9D991]'
                            }
                                `}
                            onClick={()=>submitListados()}
                        >
                            <CgList className="text-xl font-bold mr-2"/>
                            <label className="font-light">Listados</label>
                        </div>
                    }
                </div>

                {/* MENU TITULARIZACION */}
                <div className="ml-2 mt-6 text-white text-base">
                    <label className="font-normal">Titularizacion</label>
                    {(userSG.permiso!=3) &&
                        <div 
                            className={` rounded p-[4px] flex flex-row justify-start items-center
                                ${(pageSG==='InscriptosTit')
                                ?'bg-[#C9D991]'
                                :'hover:bg-[#C9D991]'
                            }
                                `}
                            onClick={()=>submitInscriptosTit()}
                        >
                            <PiUserListBold className="text-xl font-bold mr-2"/>
                            <label className="font-light">Inscriptos</label>
                        </div>
                    }
                    <div 
                        className={` rounded p-[4px] flex flex-row justify-start items-center
                            ${(pageSG==='VacantesTit')
                            ?'bg-[#C9D991]'
                            :'hover:bg-[#C9D991]'
                        }
                            `}
                        onClick={()=>submitVacantesTit()}
                    >
                        <PiListMagnifyingGlassBold className="text-xl font-bold mr-2"/>
                        <label className="font-light">Vacantes</label>
                    </div>
                </div>


                {/* MENU PROVISIONALES Y REEMPLAZANTES */}
                <div className="ml-2 mt-6 text-white text-base">
                    <label className="font-normal">Provisionales y Reemplazantes</label>
                    {(userSG.permiso!=3) &&
                        <div 
                            className={` rounded p-[4px] flex flex-row justify-start items-center
                                ${(pageSG==='InscriptosPyR')
                                ?'bg-[#C9D991]'
                                :'hover:bg-[#C9D991]'
                            }
                                `}
                            onClick={()=>submitInscriptosPyR()}
                        >
                            <PiUserListBold className="text-xl font-bold mr-2"/>
                            <label className="font-light">Inscriptos</label>
                        </div>
                    }
                    <div 
                        className={` rounded p-[4px] flex flex-row justify-start items-center
                            ${(pageSG==='VacantesPyR')
                            ?'bg-[#C9D991]'
                            :'hover:bg-[#C9D991]'
                        }
                            `}
                        onClick={()=>submitVacantesPyR()}
                    >
                        <PiListMagnifyingGlassBold className="text-xl font-bold mr-2"/>
                        <label className="font-light">Vacantes</label>
                    </div>
                </div>

                {/* MENU REPORTES */}
                {/* <div className="ml-2 mt-6 text-white text-base">
                    <label >Reportes</label>
                    <div 
                        className={` rounded p-[4px] flex flex-row justify-start items-center
                            ${(pageSG==='AsignacionesMov')
                            ?'bg-[#C9D991]'
                            :'hover:bg-[#C9D991]'
                        }
                            `}
                        onClick={()=>submitAsignaciones()}
                    >
                        <MdOutlineAssignmentTurnedIn className="text-xl font-bold mr-2"/>
                        <label className="">Asignaciones</label>
                    </div>
                    
                </div> */}

                {/* SELECCION NIVEL */}
                {/* <div className="ml-2 mt-6 text-white text-base flex flex-col">
                    <label>temporalmente seleccionar nivel al loguearse</label>
                    <button 
                        className="border-[1px] border-white m-2 rounded"
                        onClick={()=>submitNivelInicial()}
                    >Inicial</button>
                    <button 
                        className="border-[1px] border-white m-2 rounded"
                        onClick={()=>submitNivelPrimario()}
                    >Primario</button>
                </div> */}
            </div>
        </nav>
    )
};

export default SideBar;