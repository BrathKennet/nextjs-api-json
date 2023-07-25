
import data from '../../../data/productos.json'
import asyncHandler from '@/pages/libs/async.handler';
import fs from "fs";
import path from "path";

const clientePath = path.resolve("./data/productos.json");

const controllers = {
  GET: asyncHandler(async (req, res) => {
    res.status(200).json(data);
  }),
  POST: asyncHandler(async (req, res) => {
    const nuevoCliente = req.body;
    data.push(nuevoCliente);

    fs.writeFile(clientePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ message: "Error al guardar los datos del cliente" });
      } else {
        res.status(201).json({ message: "Cliente agregado exitosamente" });
      }
    });
  }),
  PATCH: asyncHandler(async (req, res) => {
    const clienteModificado = req.body;
    const clienteId = clienteModificado.id;

    const newdata = data.map((cliente) => {
      if (cliente.id === clienteId) {
        return {
          ...cliente,
          ...clienteModificado,
        };
      }
      return cliente;
    });

    fs.writeFile(clientePath, JSON.stringify(newdata), (err) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ message: "Error al guardar los datos del cliente" });
      } else {
        res.status(200).json({ message: "Cliente modificado exitosamente" });
      }
    });
  })
};

export default function handler(req, res) {
  const controller = controllers[req.method];

  if (controller) {
    controller(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


/* export default function handler(req, res) {
  console.log(data);
  res.status(200).json(data)
} */
