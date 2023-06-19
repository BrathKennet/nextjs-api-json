import React from "react";
import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ clientes, setClientes, cliente, setCliente }) => {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(cliente).length > 0) {
      setName(cliente.name);
      setDni(cliente.dni);
      setAddress(cliente.address);
      setDate(cliente.date);
      setImage(cliente.image);
    }
  }, [cliente]);
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if ([name, dni, address, date, image].includes("")) {
      setError(true);
      return;
    }

    const objetoCliente = {
      name,
      dni,
      address,
      date,
      image,
    };
    if (cliente.id) {
      //MODO EDITAR
      objetoCliente.id = cliente.id;
      const clientesActualizados = clientes.map((clienteState) =>
        clienteState.id === cliente.id ? objetoCliente : clienteState
      );
      setClientes(clientesActualizados);
      setCliente({});

      const res = await fetch("../api/client", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(objetoCliente),
      });

      const data = await res.json();

      if (data) {
        console.log("enviado");
      } else {
        console.log("error");
      }
    } else {
      //MODO AGREGAR
      objetoCliente.id = generarId();
      setClientes([...clientes, objetoCliente]);

      const res = await fetch("../api/client", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(objetoCliente),
      });

      const data = await res.json();

      if (data) {
        console.log("enviado");
      } else {
        console.log("error");
      }
    }

    setName("");
    setDni("");
    setAddress("");
    setDate("");
    setImage("");
    setError(false);
  };
  const generarId = () => {
    const date = Date.now().toString(36);
    const aleatorio = Math.random().toString(36).substring(2);
    return date + aleatorio;
  };

  return (
    <div className="w-full">
      <form
        className=" bg-black border-2 border-white backdrop-blur-md px-5 py-8 rounded-tl-3xl rounded-br-3xl"
        onSubmit={handlerSubmit}
      >
        <div className="mb-3">
          <label
            htmlFor="name"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            placeholder="Nombre del cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className=" font-bold text-[#06DA06] mb-1 block">
            DNI:
          </label>
          <input
            id="dni"
            type="text"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            placeholder="DNI del cliente"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className=" font-bold text-[#06DA06] mb-1 block">
            Dirección:
          </label>
          <input
            id="dni"
            type="text"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            placeholder="Dirección del cliente"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="date"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Fecha de Nacimiento:
          </label>
          <input
            id="date"
            type="date"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="date"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Imagen de Perfil:
          </label>
          <input
            id="image"
            type="text"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            placeholder="URL de la imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="block text-center">
          <input
            type="submit"
            value={cliente.id ? "Guardar Cliente" : "Agregar Cliente"}
            className=" bg-black p-3 px-5 mt-3 text-[#06DA06] border border-[#06DA06] font-bold hover:bg-[#06DA06] hover:text-black cursor-pointer duration-300 rounded-xl"
          />
        </div>
        {error && <Error texto="Todos los campos son obligatorios" />}
      </form>
    </div>
  );
};

export default Formulario;
