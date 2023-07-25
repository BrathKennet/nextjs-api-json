import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads"); // Carpeta donde se almacenarán las imágenes
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al cargar la imagen" });
      }

      const image = files.image; // Nombre del campo en el formulario

      if (!image) {
        return res.status(400).json({ error: "No se encontró ninguna imagen" });
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().replace(/:/g, "-");

      const imageUrl = `${formattedDate}-${image.name}`; // Ruta de la imagen cargada

      const oldPath = image.path;
      const newPath = path.join(form.uploadDir, imageUrl);

      fs.renameSync(oldPath, newPath);

      console.log("Imagen cargada:", imageUrl);

      return res
        .status(200)
        .json({ message: "Imagen cargada exitosamente", imageUrl });
    });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
};
