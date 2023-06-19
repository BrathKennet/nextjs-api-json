import { useState } from "react";

function Cliente({cliente, setCliente, eliminarCliente}) {
  const [visible, setVisible] = useState(false);

	/* const handleEliminar = ()=>{
    setVisible(true)
		const respuesta = confirm("¿Desea Eliminar el Cliente?")

		if(respuesta){
			eliminarCliente(cliente.id)
		} else {
      setVisible(false)
    }
	} */
	return (
    <>
      <div className=" px-5 py-5 rounded-xl shadow-xl mb-5 border-2 border-white grid grid-cols-2 ">
        <div className="h-fit pl-5 my-auto grid grid-cols-2 gap-4">
          <p className=" font-bold text-[#06DA06] block">
            Nombre:{" "}
            <span className="font-normal text-white">{cliente.name}</span>
          </p>
          <p className=" font-bold text-[#06DA06] block">
            DNI:{" "}
            <span className="font-normal text-white">
              {cliente.dni}
            </span>
          </p>
          <p className=" font-bold text-[#06DA06] block">
            Dirección:{" "}
            <span className="font-normal text-white">{cliente.address}</span>
          </p>
          <p className=" font-bold text-[#06DA06] block">
            Fecha:{" "}
            <span className="font-normal text-white">{cliente.date}</span>
          </p>
        </div>
        <div className="mb-5">
          <img
            className="h-[250px] w-[250px] border border-white mx-auto "
            src={cliente.image}
            alt="imagen"
          />
        </div>
        <div className="col-span-2 w-fit mx-auto mt-3">
          <button
            type="button"
            className="px-10 py-2 bg-green-600 p-3 mx-3 rounded-xl text-white hover:bg-black border border-green-600 duration-300 text-center"
            onClick={() => setCliente(cliente)}
          >
            Editar
          </button>
          <button
            type="button"
            className="px-10 py-2 bg-red-600 p-3 mx-3 rounded-xl text-white hover:bg-black border border-red-600 duration-300 text-center"
            onClick={() => setVisible(true)}
          >
            Eliminar
          </button>
        </div>
      </div>
      {visible && (
        <div className="bg-white/25 fixed h-screen w-screen top-0 right-0 flex">
          <div className="bg-black w-fit h-fit m-auto px-10 py-20 text-white border border-[#06DA06] border-dashed ">
            <p className="text-center mb-16 font-semibold ">
              ¿Desea eliminar el cliente "{cliente.name}"?
            </p>
            <button
              type="button"
              className="px-10 py-2 bg-red-600 p-3 mx-3 rounded-xl text-white hover:bg-black border border-red-600 duration-300 text-center"
              onClick={() => {
                eliminarCliente(cliente);
                setVisible(false);
              }}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="px-10 py-2 bg-blue-600 p-3 mx-3 rounded-xl text-white hover:bg-black border border-blue-600 duration-300 text-center"
              onClick={() => setVisible(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cliente