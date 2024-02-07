import React from "react";
import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ productos, setProductos, producto, setProducto }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(producto).length > 0) {
      setName(producto.name);
      setDescription(producto.description);
      setPrice(producto.price);
      setDate(producto.date);
      setImage(producto.image);
    }
  }, [producto]);
  const handlerSubmit = async (e) => {
    e.preventDefault();

    

    /* if ([name, description, price, date].includes("")) {
      setError(true);
      return;
    } */

    const objetoCliente = {
      name,
      description,
      price,
      date,
      image: "",
    };
    if (producto.id) {
      //MODO EDITAR
      objetoCliente.id = producto.id;

      const formData = new FormData();
      formData.append("image", e.target.image.files[0]);

      const uploadImageResponse = await fetch("../api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (uploadImageResponse.ok) {
        const uploadImageJson = await uploadImageResponse.json();
        const rutaimagen = uploadImageJson.imageUrl;
        console.log("Ruta imagen:", rutaimagen);

        objetoCliente.image = "uploads/" + rutaimagen;

        // La primera solicitud se completó correctamente
        console.log("Imagen cargada exitosamente");

        const productResponse = await fetch("../api/product", {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(objetoCliente),
        });

        if (productResponse.ok) {
          // La segunda solicitud se completó correctamente
          console.log("Producto creado exitosamente");
          const clientesActualizados = productos.map((clienteState) =>
            clienteState.id === producto.id ? objetoCliente : clienteState
          );
          setProductos(clientesActualizados);
          setProducto({});
        } else {
          console.error("Error al crear el producto:", productResponse.status);
        }
      } else {
        console.error("Error al cargar la imagen:", uploadImageResponse.status);
      }
    } else {
      //MODO AGREGAR

      objetoCliente.id = generarId();

      const formData = new FormData();
      formData.append("image", e.target.image.files[0]);

      const uploadImageResponse = await fetch("../api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (uploadImageResponse.ok) {
        const uploadImageJson = await uploadImageResponse.json();
        const rutaimagen = uploadImageJson.imageUrl;
        console.log("Ruta imagen:", rutaimagen);

        objetoCliente.image = "uploads/" + rutaimagen;

        // La primera solicitud se completó correctamente
        console.log("Imagen cargada exitosamente");

        const productResponse = await fetch("../api/product", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(objetoCliente),
        });

        if (productResponse.ok) {
          // La segunda solicitud se completó correctamente
          console.log("Producto creado exitosamente");
          setProductos([...productos, objetoCliente]);
        } else {
          console.error("Error al crear el producto:", productResponse.status);
        }
      } else {
        console.error("Error al cargar la imagen:", uploadImageResponse.status);
      }
    }

    setName("");
    setDescription("");
    setPrice("");
    setDate("");
    setImage("");
    setError(false);
  };
  const generarId = () => {
    const date = Date.now().toString(36);
    const aleatorio = Math.random().toString(36).substring(2);
    return date + aleatorio;
  };

  const handleImageUpload = (files) => {
    const file = files[0];
    setUploadedImage(file);
  };

  return (
    <div className="w-full">
      <h2 className=" font-black text-2xl text-center text-[#06DA06] mb-10 ">
        Formulario de Productos
      </h2>
      <form
        className=" bg-black border-2 border-white backdrop-blur-md px-5 py-8 rounded-tl-3xl rounded-br-3xl"
        onSubmit={handlerSubmit}
      >
        <div className="mb-3">
          <label
            htmlFor="name"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Nombre del Producto:
          </label>
          <input
            id="name"
            type="text"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Descripción del Producto:
          </label>
          <input
            id="description"
            type="text"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            placeholder="Descripción del producto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Precio:
          </label>
          <input
            id="description"
            type="number"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            placeholder="Dirección del producto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="date"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Fecha de Ingreso:
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
            htmlFor="image"
            className=" font-bold text-[#06DA06] mb-1 block"
          >
            Imagen del Producto:
          </label>
          <input
            name="image"
            type="file"
            className="w-full border-2 p-2 rounded-lg placeholder-gray-400 bg-black border-white text-white"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </div>
        <div className="block text-center">
          <input
            type="submit"
            value={producto.id ? "Guardar Producto" : "Agregar Producto"}
            className=" bg-black p-3 px-5 mt-3 text-[#06DA06] border border-[#06DA06] font-bold hover:bg-[#06DA06] hover:text-black cursor-pointer duration-300 rounded-xl"
          />
        </div>
        {error && <Error texto="Todos los campos son obligatorios" />}
      </form>
    </div>
  );
};

export default Formulario;
