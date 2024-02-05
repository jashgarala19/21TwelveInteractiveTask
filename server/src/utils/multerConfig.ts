import multer, { Multer } from "multer";
import path from "path";

const getMulterConfig = (uploadPath: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return { storage };
};

export { getMulterConfig };
