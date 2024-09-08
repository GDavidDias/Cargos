const ContentModalVerVacante = ({idVacante,formVacante,closeModal,handleChangeFormVacante,estadoForm,datosVacante,submitGuardarFormVacante})=>{
    console.log('ingreso a ContentModalVerVacante')
    //console.log('datos completo de Vacante Seleccionada: ', datosVacante);
    return(
        <div className="h-100 w-100  flex flex-col items-center">
            <label 
                className="text-xl text-center font-bold " 
                translate='no'
            >Datos de la Vacante</label>
            <div>
                <div className="min-h-[32vh] w-[60vw] mt-2 border-[1px] border-sky-800 rounded">
                    <div className="flex flex-row ml-2 mt-2">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">ID</label>
                            <input 
                                className="border-[1px] border-zinc-400 w-[15mm] text-center"
                                value={idVacante}
                                disabled={true}
                            />
                        </div>
                        
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Establecimiento</label>
                            <input 
                                name="establecimiento"
                                className="border-[1px] border-zinc-400 w-[50mm] pl-[2px]"
                                value={formVacante?.establecimiento}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>

                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Observaciones Establecimiento</label>
                            <input 
                                name="obs_establecimiento"
                                className="border-[1px] border-zinc-400 w-[67mm] pl-[2px]"
                                value={formVacante?.obs_establecimiento}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>


                    </div>
                    <div className="flex flex-row ml-2 mt-2">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Cargo</label>
                            <input 
                                name="cargo"
                                className="border-[1px] border-zinc-400 w-[40mm] pl-[2px]"
                                value={formVacante?.cargo}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Modalidad</label>
                            <input 
                                name="modalidad"
                                className="border-[1px] border-zinc-400 w-[30mm] pl-[2px]"
                                value={formVacante?.modalidad}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Turno</label>
                            <input 
                                name="turno"
                                className="border-[1px] border-zinc-400 w-[30mm] pl-[2px]"
                                value={formVacante?.turno}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Cupof</label>
                            <input 
                                name="cupof"
                                className="border-[1px] border-zinc-400 w-[30mm] pl-[2px]"
                                value={formVacante?.cupof}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>

                    </div>

                    <div className="flex flex-row ml-2 mt-2">
                        <div className="flex flex-col mr-2">
                            <label className="text-sm">Region</label>
                            <input 
                                name="region"
                                className="border-[1px] border-zinc-400 w-[12mm] pl-[2px]"
                                value={formVacante?.region}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Departamento</label>
                            <input 
                                name="departamento"
                                className="border-[1px] border-zinc-400 w-[50mm] pl-[2px]"
                                value={formVacante?.departamento}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Localidad</label>
                            <input 
                                name="localidad"
                                className="border-[1px] border-zinc-400 w-[50mm] pl-[2px]"
                                value={formVacante?.localidad}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>
                        <div className="flex flex-col mx-2">
                            <label className="text-sm">Zona</label>
                            <input 
                                name="zona"
                                className="border-[1px] border-zinc-400 w-[16mm] pl-[2px]"
                                value={formVacante?.zona}
                                onChange={handleChangeFormVacante}
                                disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>

                    </div>
                </div>

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