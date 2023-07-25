import React from 'react'
import Producto from './Producto'

const ListadoProductos = ({productos, setProducto, eliminarProducto}) => {
	return (
    <div className="w-full col-span-2 h-[640px] overflow-y-scroll px-10 ">
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          producto={producto}
          setProducto={setProducto}
          eliminarProducto={eliminarProducto}
        />
      ))}
    </div>
  );
}

export default ListadoProductos