const ContentModalAsignacionTit = ({closeModalAsign,datosInscriptoSelect,datosVacanteSelect,procesoImpresion,submitAsignarVacante}) =>{
    return(
        <div className="h-100 w-100  flex flex-col items-center">
                <label 
                    className="text-xl text-center font-bold mb-2" 
                    translate='no'
                >
                ASIGNACION VACANTE TITULARIZACION
                </label>
                {/* DATOS DEL INSCRIPTO */}
                <div className="border-[1px] border-purple-400 flex flex-col justify-center rounded-md shadow font-semibold text-lg bg-purple-100 mb-2">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <label className="mx-4 text-zinc-800">Docente: {datosInscriptoSelect.apellido} {datosInscriptoSelect.nombre}</label>
                        </div>
                        <div className="flex flex-row">
                            <label className="mx-4 text-zinc-800">DNI: {datosInscriptoSelect.dni}</label>
                            <label className="mr-4 text-zinc-800">Puntaje: {datosInscriptoSelect.total}</label>
                        </div>
                    </div>
                </div>
                {/* DATOS DE LOS CARGOS */}
                <div className="flex flex-row w-[50vw] justify-center">
                    
                    {/* CARGO A TOMAR */}
                    <div className="flex flex-col border-[5px] border-emerald-500 w-[70%] items-center m-y-[4px] ml-[9px] rounded-md shadow-lg bg-emerald-100">
                        <div className="flex items-center">
                            <label className="font-bold text-lg">Datos de Vacante</label>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex flex-row my-2">
                                <label className="mb-0 font-semibold text-base mr-2">N° Establecimiento</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.nro_establecimiento}</div>
                            </div>
                            <div className="flex flex-row my-2">
                                <label className="mb-0 font-semibold text-base mr-2">Establecimiento</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.nombre_establecimiento}</div>
                            </div>
                            <div className="flex flex-row my-2">
                                <label className="font-semibold text-base mr-2">Cargo</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.cargo}</div>
                            </div>
                            <div className="flex flex-row my-2">
                                <label className="font-semibold text-base mr-2">Modalidad</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.modalidad}</div>
                            </div>
                            <div className="flex flex-row my-2">
                                <label className="font-semibold text-base mr-2">Turno</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.turno}</div>
                            </div>
                            <div className="flex flex-row my-2">
                                <label className="font-semibold text-base mr-2">Region</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.region}</div>
                            </div>
                            <div className="flex flex-row my-2">
                                <label className="font-semibold text-base mr-2">Departamento</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.departamento}</div>
                            </div>
                            <div className="flex flex-row my-2">
                                <label className="font-semibold text-base mr-2">Localidad</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.localidad}</div>
                            </div>
                            <div className="flex flex-row mt-2 mb-4">
                                <label className="font-semibold text-base mr-2">Zona</label>
                                <div className="mt-[-4px] border-[1px] border-zinc-300 rounded w-[20vw] h-[4vh] pl-[4px] bg-neutral-50">{datosVacanteSelect.zona}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                        onClick={()=>submitAsignarVacante()}
                        translate='no'
                    >ACEPTAR</button>
                    <button
                        className="border-2 border-[#7C8EA6] mt-10 font-semibold w-40 h-8 bg-[#7C8EA6] text-white shadow hover:bg-[#C9D991] hover:border-[#C9D991] rounded mx-2"
                        onClick={closeModalAsign}
                        translate='no'
                    >CANCELAR</button>
                    <button
                        onClick={()=>procesoImpresion()}
                    >imprimir (test)</button>
                </div>                
            </div>
    )
};

export default ContentModalAsignacionTit;