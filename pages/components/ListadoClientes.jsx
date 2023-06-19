import React from 'react'
import Cliente from './Cliente'

const ListadoClientes = ({clientes, setCliente, eliminarCliente}) => {
	return (
    <div className="w-full col-span-2 h-[640px] overflow-y-scroll px-10 ">
      {clientes.map((cliente) => (
        <Cliente
          key={cliente.id}
          cliente={cliente}
          setCliente={setCliente}
          eliminarCliente={eliminarCliente}
        />
      ))}
    </div>
  );
}

export default ListadoClientes