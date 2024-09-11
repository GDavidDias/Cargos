const ContentModalVerVacante = ({idVacante,formVacante,closeModal,handleChangeFormVacante,estadoForm,datosVacante,submitGuardarFormVacante,inscriptoAsignado})=>{
    console.log('ingreso a ContentModalVerVacante')
    //console.log('datos completo de Vacante Seleccionada: ', datosVacante);
    return(
        <div className="h-100 w-100  flex flex-col items-center">
            <label 
                className="text-xl text-center font-bold " 
                translate='no'
            >Datos de la Vacante</label>
            <div>
                <div className="min-h-[23vh]  mt-2 border-[1px] border-sky-800 rounded">
                    <div className="flex flex-col ml-2 mt-2 items-end justify-end">
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">ID:</label>
                            <input 
                                className="border-[1px] border-zinc-400 w-[60mm] text-start pl-2"
                                value={idVacante}
                                disabled={true}
                            />
                        </div>

                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">N° Est:</label>
                            <input 
                                name="establecimiento"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.establecimiento}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>

                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Nombre Est:</label>
                            <input 
                                name="obs_establecimiento"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.obs_establecimiento}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>


                    </div>
                    <div className="flex flex-col ml-2  items-end justify-end">
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Cargo:</label>
                            <input 
                                name="cargo"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.cargo}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Modalidad:</label>
                            <input 
                                name="modalidad"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.modalidad}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Turno:</label>
                            <input 
                                name="turno"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.turno}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Cupof:</label>
                            <input 
                                name="cupof"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.cupof}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>

                    </div>

                    <div className="flex flex-col ml-2 items-end justify-end">
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Region:</label>
                            <input 
                                name="region"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.region}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Departamento:</label>
                            <input 
                                name="departamento"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.departamento}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-sm mr-2">Localidad:</label>
                            <input 
                                name="localidad"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.localidad}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-row mt-[4px] mb-4 mx-2 items-center justify-end">
                            <label className="text-sm mr-2">Zona:</label>
                            <input 
                                name="zona"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-[2px] text-start pl-2"
                                value={formVacante?.zona}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                    </div>
                </div>

                {/* DATOS DE SU ASIGNACION */}
                {(inscriptoAsignado.length!=0) &&
                <div className="min-h-[10vh] w-[60vw] mt-2 border-[1px] border-orange-500 rounded">
                    <label 
                        className="ml-2 font-semibold"
                    >Asignado a:</label>
                    <div className="flex flex-row">
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Apellido</label>
                            <input 
                                name="apellido"
                                className="border-[1px] border-zinc-400 w-[50mm] pl-[2px] text-start pl-2"
                                value={inscriptoAsignado[0].apellido}
                                //onChange={handleChangeFormVacante}
                                disabled={true}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Nombre</label>
                            <input 
                                name="nombre"
                                className="border-[1px] border-zinc-400 w-[70mm] pl-[2px] text-start pl-2"
                                value={inscriptoAsignado[0].nombre}
                                //onChange={handleChangeFormVacante}
                                disabled={true}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">DNI</label>
                            <input 
                                name="dni"
                                className="border-[1px] border-zinc-400 w-[30mm] pl-[2px] text-start pl-2"
                                value={inscriptoAsignado[0].dni}
                                //onChange={handleChangeFormVacante}
                                disabled={true}
                            />
                        </div>
                    </div>

                </div>
                }                

                {/* VISIBILIDAD DE BOTONES */}
                <div className="flex justify-center">
                    {(estadoForm==='ver' || datosVacante?.datetime_asignacion!=null) &&
                        <button
                            className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                            onClick={closeModal}
                            translate='no'
                        >CERRAR</button>
                    }
                    {(estadoForm==='editar' && datosVacante?.datetime_asignacion===null) &&
                        <div>
                            <button
                                className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={submitGuardarFormVacante}
                                translate='no'
                            >GUARDAR</button>
                            <button
                                className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={closeModal}
                                translate='no'
                            >CANCELAR</button>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
};

export default ContentModalVerVacante;