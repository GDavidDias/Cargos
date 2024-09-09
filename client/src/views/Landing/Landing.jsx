import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfig } from "../../utils/fetchConfig";
import { setConfig, setNivel } from "../../redux/configSlice";
import { useNavigate } from "react-router-dom";
import ModalEdit from "../../components/ModalEdit/ModalEdit";
import { useModal } from "../../hooks/useModal";
import { IoMdEyeOff } from "react-icons/io";
import { conexion } from "../../utils/conexion";
import { outUser, setUser } from "../../redux/userSlice";

const Landing = () => {
    
    const configSG = useSelector((state)=>state.config);

    //E.L de Ventanas Modales
    const[isOpenModalNivel, openModalNivel, closeModalNivel]=useModal(false);

    const[ver,setVer]=useState(false);

    const[form,setForm]=useState({
        username:'',
        password:''
    });

    const handleChange = (event)=>{
        const{name,value} = event.target;
        //console.log(name, value)
        if(name=='username'){
            setForm({...form,[name]:value.toUpperCase()});
        }
        if(name=='password'){
            setForm({...form,[name]:value});
        }
    };

    const handleVer=()=>{
        setVer(!ver);
    };

    const handleKeyPress = (event)=>{
        if(event.key==='Enter'){
            document.getElementById("botonEnter")?.click();
            //submitHandler();
        }
    };

    const submitHandler = async()=>{
        
        const datavalida = await conexion(form);
        if(datavalida.length!=0){
            dispatch(setUser(datavalida));
            navigate('/home');
        }else{
            dispatch(outUser());
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitNivelInicial = () =>{
        console.log('Presiono Nivel Inicial');
        const datosNivel=[{id_nivel:1, descripcion:'INICIAL'}];
        dispatch(setNivel(datosNivel));
        //navigate('/home');
        closeModalNivel();
    };

    const submitNivelPrimario = ()=>{
        console.log('Presiono Nivel Primario');
        const datosNivel=[{id_nivel:2, descripcion:'PRIMARIO'}];
        dispatch(setNivel(datosNivel));
        //navigate('/home');
        closeModalNivel();
    };

    const getConfiguracion = async() =>{
        const data = await fetchConfig();
        console.log('que trae configuracion: ', data);
        dispatch(setConfig(data));
    };

    useEffect(()=>{
        console.log('que tiene configSG: ', configSG);
    },[configSG])
        
    useEffect(()=>{ 
        //Se carga la tabla de configuracion
        getConfiguracion();
        openModalNivel();
    },[])

    return(
        <div>
            <div className="h-[15vh] flex flex-row justify-center items-center bg-[#729DA6] border border-b-slate-400 w-full shadow-md ">
                <div className="desktop:w-[90px] desktop:h-[90px] movil:w-[80px] movil:h-[80px] flex justify-center ">
                    <img className="desktop:w-[90px] desktop:h-[90px] movil:w-[80px] movil:h-[80px]" src=""/>
                </div>
                <div className="h-28  flex flex-col pl-4 justify-center">
                    <label className="text-[38px]  font-bold text-white" translate='no'>Sistema de Cargos</label>
                    <label className="text-[25px] text-white" translate='no'>Nivel {configSG.nivel?.descripcion}</label>
                </div>
            </div>

            <div className="desktop:h-[50vh] flex flex-col justify-center items-center  bg-[#FFFEFC]  border-2 border-[#729DA6] desktop:w-[50vw] movil:w-full movil:h-[50vh] rounded-lg mt-10 shadow-lg  p-4">
            <label className="text-[#729DA6] font-medium text-[20px] pt-4 " translate='no'>Ingresar al Sistema</label>
            <div className="flex flex-row my-6">
                <div className="flex flex-col text-right movil:w-[28vw] desktop:w-[15vw]">
                    <label className="m-2 " translate='no'>Nombre de usuario</label>
                    <label className="m-2 " translate='no'>Contraseña</label>
                </div>
                <div className="flex flex-col justify-end">
                    <input
                        className="m-2 border-[1px] border-black rounded px-2 w-[200px]"
                        value={form.username}
                        onChange={handleChange}
                        name="username"
                        type="text"
                    ></input>
                    <div className="flex flex-row items-center">
                        <input
                            className="m-2 border-[1px] border-black rounded px-2 w-[200px]"
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                            type={ver ? 'text' :'password'}      
                            onKeyPress={handleKeyPress}
                        ></input>
                        <IoMdEyeOff onClick={()=>handleVer()}/>
                    </div>
                </div>
                </div>
                <label
                    className="text-sky-500 hover:text-sky-800 hover:cursor-pointer"
                    //onClick={()=>ModalChangePass()}
                >Cambiar Contraseña</label>
                <button
                    className="w-40 h-8 bg-[#729DA6] my-2 px-2 py-1 text-base font-medium text-white hover:bg-[#6A88F7] shadow-md rounded"
                    onClick={submitHandler}
                    translate='no'
                    id="botonEnter"
                >Acceder</button>
            </div>

            {/* MODAL INICIAL SELECCION NIVEL */}
            <ModalEdit isOpen={isOpenModalNivel} closeModal={closeModalNivel}>
                <div className="mt-10 w-72">
                    <h1 className="text-xl text-center font-bold">Seleccione el Nivel</h1>
                    <div className="flex justify-center">
                        <button
                            className="border-2 border-[#557CF2] mt-10 mr-2 font-bold w-40 h-8 bg-[#557CF2] text-white hover:bg-sky-300 hover:border-sky-300"
                            onClick={()=>submitNivelInicial()}
                        >Inicial</button>
                        <button
                            className="border-2 border-[#557CF2] mt-10 ml-2 font-bold w-40 h-8 bg-[#557CF2] text-white hover:bg-sky-300 hover:border-sky-300"
                            onClick={()=>submitNivelPrimario()}
                        >Primario</button>
                    </div>
                </div>
            </ModalEdit>

        </div>
    )
};

export default Landing;