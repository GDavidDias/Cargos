const ReporteAsignacionesRealizadas = ({listado})=>{
    return(
        <div>
            <table className="border-[1px] bg-slate-50 w-full page-break-after border">
                <thead>
                    <tr className="sticky top-0 text-sm border-b-[1px] border-gray-500 bg-zinc-200">
                        <th className="border-x-[1px] border-gray-500">Legajo</th>
                        <th className="border-x-[1px] border-gray-500">Dni</th>
                        <th className="border-x-[1px] border-gray-500">Total</th>
                        <th className="border-x-[1px] border-gray-500">Apellido</th>
                        <th className="border-x-[1px] border-gray-500">Nombre</th>
                        <th className="border-x-[1px] border-gray-500">Observacion</th>
                        <th className="border-x-[1px] border-gray-500">N° Escuela Actual</th>
                        <th className="border-x-[1px] border-gray-500">Cargo Actual</th>
                        <th className="border-x-[1px] border-gray-500">Cargo Solicitado</th>
                        <th className="border-x-[1px] border-gray-500">Cargo que Toma</th>
                        <th className="border-x-[1px] border-gray-500">N° Escuela que Toma</th>
                        <th className="border-x-[1px] border-gray-500">Resolucion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listado?.map((item,index)=>(
                            <tr key={index} className="border-[1px] border-gray-500 bg-white text-sm text-center break-inside-avoid">
                                <td className="border-x-[1px] border-gray-500">{item.legajo}</td>
                                <td className="border-x-[1px] border-gray-500">{item.dni}</td>
                                <td className="border-x-[1px] border-gray-500">{item.total}</td>
                                <td className="border-x-[1px] border-gray-500">{item.apellido}</td>
                                <td className="border-x-[1px] border-gray-500">{item.nombre}</td>
                                <td className="border-x-[1px] border-gray-500">{item.observacion}</td>
                                <td className="border-x-[1px] border-gray-500">{item.nro_escuela_actual}</td>
                                <td className="border-x-[1px] border-gray-500">{item.cargo_actual}</td>
                                <td className="border-x-[1px] border-gray-500">{item.cargo_solicitado}</td>
                                <td className="border-x-[1px] border-gray-500">{item.cargo_toma}</td>
                                <td className="border-x-[1px] border-gray-500">{item.nro_escuela_toma} {item.obs_establecimiento}</td>
                                <td className="border-x-[1px] border-gray-500">{item.resolucion}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default ReporteAsignacionesRealizadas;