import { PiUserListBold, PiListMagnifyingGlassBold  } from "react-icons/pi";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { CgList } from "react-icons/cg";
import logo from '../../assets/JUNTA-04-xs.png';
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/pageSlice";
import { useEffect } from "react";

const SideBar = () => {
    const dispatch = useDispatch();
    
    const pageSG = useSelector((state)=>state.page.page);

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
    }

    useEffect(()=>{
        console.log('que tiene pageSG: ', pageSG);
    },[pageSG])

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
                        ${(pageSG==='VacantesMov')
                        ?'bg-[#C9D991]'
                        :'hover:bg-[#C9D991]'
                    }
                        `}
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
                        ${(pageSG==='VacantesMov')
                        ?'bg-[#C9D991]'
                        :'hover:bg-[#C9D991]'
                    }
                        `}
                >
                    <CgList className="text-xl font-bold mr-2"/>
                    <label className="">Listados</label>
                </div>
            </div>
        </div>
    )
};

export default SideBar;