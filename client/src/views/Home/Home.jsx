import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/pageSlice";
import InscriptosMov from "../../components/InscriptosMov/InscriptosMov";

const Home = () =>{
    const dispatch = useDispatch();

    
    const pageSG = useSelector((state)=>state.page.page);
    const[content, setContent]=useState(null);

    useEffect(()=>{
        console.log('en que pagina estoy: ', pageSG);
        switch(pageSG){
            case 'InscriptosMov':
                setContent(<InscriptosMov/>);
                break;
            case 'NewDocumento':
                //setContent(<NewDocumento/>);
                break;
            case 'SearchDocumento':
                //setContent();
                break;
            case 'EditDocumento':
                //setContent(<EditarDocumento/>);
                break;
            case 'Metricas':
                //setContent(<Dashboard/>);
                break;
        }
    },[pageSG]);

    //AL RENDERIZAR AL INICIO
    useEffect(()=>{
        dispatch(setPage('InscriptosMov'));
    },[])
    return(
        <div className="h-full w-full fixed border-2 border-sky-500">
            <div>
                {/* BARRA NAVEGACION */}
                <SideBar/>
            </div>
            <div>
                {/* PAGINAS DE CONTENIDOS */}
                {content}
            </div>
            <div>
                {/* PIE DE SITIO */}
                <Footer/>
            </div>
        </div>
    )
};

export default Home;