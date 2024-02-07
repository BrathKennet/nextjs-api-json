import { Inter } from "next/font/google";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoProductos from "./components/ListadoProductos";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [productos, setProductos] = useState(null);
  const [producto, setProducto] = useState({});

  const eliminarProducto = async (clienteD) => {
    const clienteid = clienteD.id;

    const clientesActualizados = productos.filter(
      (producto) => producto.id != clienteid
    );
    setProductos(clientesActualizados);

    const res = await fetch(`/api/product/${clienteid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data);
    } else {
      console.log("error");
    }
  };

  const getData = async () => {
    try {
      const res = await fetch("/api/product");
      if (res.ok) {
        const dataGet = await res.json();
        setProductos(dataGet);
      } else {
        throw new Error("Error al obtener los datos de los productos");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!productos) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mx-auto pt-10 px-10 bg-black min-h-screen w-full">
      <Header />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full">
        {productos && (
          <>
            <Formulario
              productos={productos}
              setProductos={setProductos}
              producto={producto}
              setProducto={setProducto}
            />

            <ListadoProductos
              productos={productos}
              setProducto={setProducto}
              eliminarProducto={eliminarProducto}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
