import data from "../../../data/productos.json";
import asyncHandler from "@/pages/libs/async.handler";
import fs from "fs";
import path from "path";

const clientePath = path.resolve("./data/productos.json");

const controllers = {
  DELETE: asyncHandler(async (req, res) => {
    const { id } = req.query;
    const idCliente = id

    const newData = data.filter((cliente) => cliente.id != idCliente);

    fs.writeFile(clientePath, JSON.stringify(newData), (err) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ message: "Error al guardar los datos del cliente" });
      } else {
        res.status(200).json(req.body);
      }
    });
  }),
  /* DELETE: asyncHandler(async (req, res) => {
    const { id } = req.query;
    const document = req.body;
    await deleteDoc(collection(db, "documents", id));
    res.status(200).json(document);
  }), */
};

export default function handler(req, res) {
  const controller = controllers[req.method];
  if (controller) {
    controller(req, res);
  } else {
    res.status(405).json({
      messge: "Method not allowed",
    });
  }
}
