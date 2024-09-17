const ContentModalDatosInscriptoTit =({datosFormInscripto,idInscriptoSelect,closeModal,handleChangeFormInscripto,formEstadoInscripto,submitGuardarFormInscripto})=>{
    console.log('ingreso a ContentModalDatosInscriptoTit');
    return(
        <div className="notranslate h-100 w-100 flex flex-col items-center">
            <label 
                className="text-xl text-center font-bold flex flex-row items-center" 
                translate='no'
            >Datos del Inscripto <p className="text-sm font-light ml-2">({idInscriptoSelect})</p></label>

            <div>
                {/* DATOS DEL INSCRIPTO */}
                <div className="border-[1px] border-sky-500 rounded-md w-[100mm] py-2 my-2 font-semibold bg-blue-100">
                    <div className="flex flex-col ml-2 mt-[2px] items-end justify-end">
                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-base mr-2">Orden:</label>
                            <input 
                                name="dni"
                                className="border-[1px] border-zinc-400 w-[60mm] text-start pl-2 bg-neutral-50 "
                                value={datosFormInscripto?.orden}
                                disabled={true}
                            />
                        </div>

                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-base mr-2">Dni:</label>
                            <input 
                                name="dni"
                                className="border-[1px] border-zinc-400 w-[60mm] text-start pl-2 bg-neutral-50"
                                value={datosFormInscripto?.dni}
                                onChange={handleChangeFormInscripto}
                            />
                        </div>

                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-base mr-2">Nombre:</label>
                            <input 
                                name="nombre"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-2 text-start pl-2 bg-neutral-50"
                                value={datosFormInscripto?.nombre}
                                onChange={handleChangeFormInscripto}
                                //disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>

                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-base mr-2">Apellido:</label>
                            <input 
                                name="apellido"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-2 text-start pl-2 bg-neutral-50"
                                value={datosFormInscripto?.apellido}
                                onChange={handleChangeFormInscripto}
                                //disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>

                        <div className="flex flex-row my-[4px] mx-2 items-center">
                            <label className="text-base mr-2">Total:</label>
                            <input 
                                name="total"
                                className="border-[1px] border-zinc-400 w-[60mm] pl-2 text-start pl-2 bg-neutral-50"
                                value={datosFormInscripto?.total}
                                onChange={handleChangeFormInscripto}
                                //disabled={(datosVacante?.datetime_asignacion!=null)}
                            />
                        </div>


                    </div>
                </div>

                {/* DATOS DE SU ASIGNACION */}
                <div>

                </div>

                {/* VISIBILIDAD DE BOTONES */}
                <div className="flex justify-center">
                    {(formEstadoInscripto==='ver') &&
                        <button
                            className="border-2 border-[#7C8EA6] mt-2 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                            onClick={closeModal}
                            translate='no'
                        >CERRAR</button>
                    }
                    {(formEstadoInscripto==='editar') &&
                        <div>
                            <button
                                className="border-2 border-[#7C8EA6] mt-2 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={submitGuardarFormInscripto}
                                translate='no'
                            >GUARDAR</button>
                            <button
                                className="border-2 border-[#7C8EA6] mt-2 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                                onClick={closeModal}
                                translate='no'
                            >CANCELAR</button>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default ContentModalDatosInscriptoTit;