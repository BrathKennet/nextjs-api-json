import React from "react";
import Producto from "./Producto";

const ListadoProductos = ({ productos, setProducto, eliminarProducto }) => {
  return (
    <div className="w-full">
      <h2 className=" font-black text-2xl text-center text-[#06DA06] mb-10 col-span-2">
        Lista de Productos
      </h2>
      <div className="col-span-2 max-h-[80vh] overflow-y-scroll lg:px-10 ">
        {productos.map((producto) => (
          <Producto
            key={producto.id}
            producto={producto}
            setProducto={setProducto}
            eliminarProducto={eliminarProducto}
          />
        ))}
      </div>
    </div>
  );
};

export default ListadoProductos;
