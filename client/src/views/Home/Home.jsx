import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/pageSlice";
import InscriptosMov from "../../components/InscriptosMov/InscriptosMov";
import VacantesMov from "../../components/VacantesMov/VacantesMov";
import AsignacionesMov from "../../components/AsignacionesMov/AsignacionesMov";
import InscriptosTit from "../../components/InscriptosTit/InscriptosTit";
import VacantesTit from "../../components/VacantesTit/VacantesTit";
import Listados from "../../components/Listados/Listados";

const Home = () =>{
    const dispatch = useDispatch();

    
    const pageSG = useSelector((state)=>state.page.page);
    const[content, setContent]=useState(null);

    useEffect(()=>{
        console.log('en que pagina estoy: ', pageSG);
        switch(pageSG){
            case 'InscriptosMov': //Pantalla de Inscriptos para Movimientos segun Nivel
                setContent(<InscriptosMov/>);
                break;
            case 'VacantesMov': //Pantalla de Vacantes para Movimientos segun Nivel
                setContent(<VacantesMov/>);
                break;
            case 'InscriptosTit':
                setContent(<InscriptosTit/>);
                break;
            case 'VacantesTit':
                setContent(<VacantesTit/>);
                break;
            case 'Asignaciones': //Pantalla de Asignaciones Realizadas, segun tipo de movimiento y nivel
                setContent(<AsignacionesMov/>);
                break;
            case 'Listados': //Pantalla de Listados
                setContent(<Listados/>);
                break;
        }
    },[pageSG]);

    //AL RENDERIZAR AL INICIO
    useEffect(()=>{
        dispatch(setPage('InscriptosMov'));
    },[])
    return(
        <div className="h-full w-full fixed ">
            {/* CONTENEDOR SUPERIOR */}
            <div className="w-full h-[95vh] flex flex-row">
                <div className="w-[15vw] h-[95vh] ">
                    {/* BARRA NAVEGACION */}
                    <SideBar/>
                </div>
                <div className="w-[85vw] h-[95vh]">
                    {/* PAGINAS DE CONTENIDOS */}
                    {content}
                </div>
            </div>
            {/* CONTENEDOR INFERIOR */}
            <div className="w-full h-[5vh]">
                {/* PIE DE SITIO */}
                <Footer/>
            </div>
        </div>
    )
};

export default Home;