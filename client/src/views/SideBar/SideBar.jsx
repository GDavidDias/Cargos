import { PiUserListBold, PiListMagnifyingGlassBold  } from "react-icons/pi";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { CgList } from "react-icons/cg";
import logo from '../../assets/JUNTA-04-xs.png';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setNivel, setPage } from "../../redux/configSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const pageSG = useSelector((state)=>state.config.page);
    const nivelSG = useSelector((state)=>state.config.nivel);
    const userSG = useSelector((state)=>state.user);

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

    // const submitNivelInicial = () =>{
    //     console.log('Presiono Nivel Inicial');
    //     const datosNivel=[{id_nivel:1, descripcion:'INICIAL'}];
    //     dispatch(setNivel(datosNivel));
    // };

    // const submitNivelPrimario = ()=>{
    //     console.log('Presiono Nivel Primario');
    //     const datosNivel=[{id_nivel:2, descripcion:'PRIMARIO'}];
    //     dispatch(setNivel(datosNivel));
    // };

    useEffect(()=>{
        console.log('que tiene pageSG: ', pageSG);
        console.log('que tiene nivelSG: ', nivelSG);
    },[pageSG,nivelSG])

    useEffect(()=>{
        console.log('que tiene userSG: ', userSG);
        if(userSG.id_user===''){
            navigate('/');
        }
    },[userSG])

    return(
        <div className="bg-[#7C8EA6] w-full h-full shadow-right-only-md">
            {/* LOGO Y TITULO APP */}
            <div className="h-[8vh] p-[4px] flex flex-row items-center" >
                <div className="flex w-[5vw] ">
                    <img src={logo}/>
                </div>
                <div className="flex flex-col ml-[2px] text-white">
                    <label className="">Sistema de</label>
                    <label className="font-semibold ">CARGOS</label>
                </div>
            </div>

            {/* MENU MOVIMIENTOS */}
            <div className="ml-2 mt-2 text-white text-base">
                <label >Movimientos</label>
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
                    <label className="">Inscriptos</label>
                </div>
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
                    <label className="">Vacantes</label>
                </div>
            </div>

            {/* MENU TITULARIZACION */}
            <div className="ml-2 mt-6 text-white text-base">
                <label >Titularizacion</label>
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
                    <label className="">Inscriptos</label>
                </div>
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
                    <label className="">Vacantes</label>
                </div>
            </div>

            {/* MENU REPORTES */}
            <div className="ml-2 mt-6 text-white text-base">
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
                    <label className="">Listados</label>
                </div>
            </div>

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
    )
};

export default SideBar;