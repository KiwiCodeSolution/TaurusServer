const Gallery_model = require("../mongoDB/models/Gallery");
const multer = require("multer");
const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");
const { BadRequest } = require("http-errors");
const FILE_MAX_SIZE = 8388608;
const VALID_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

const invalidMimeTypesFilter = (req, file, cb) => {
  if (!VALID_MIME_TYPES.includes(file.mimetype)) {
    cb(
      BadRequest(
        `Invalid file mimetype - ${file.mimetype
        }. Mimetype must be one of: ${VALID_MIME_TYPES.join(", ")}.`
      )
    );
  } else {
    cb(null, true);
  }
};

const storage = multer.diskStorage({
  destination: "uploads/", // Папка, куда будут сохраняться загруженные изображения

  filename: (req, file, cb) => {
    const parsedOriginalName = file.originalname.split(".");
    const extention = parsedOriginalName.pop();
    const OriginalNameWithoutExtention = parsedOriginalName.join(".");
    const fileName = `${OriginalNameWithoutExtention}_${Date.now()}.${extention}`;
    cb(null, fileName);
  },
});

module.exports.upload = multer({
  storage,
  limits: {
    fileSize: FILE_MAX_SIZE,
  },
  fileFilter: invalidMimeTypesFilter,
});

module.exports.upload_img = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new BadRequest("No image uploaded");
    }

    if (!isValidImageFormat(req.file.mimetype)) {
      throw new BadRequest("Invalid image format");
    }
    const resizedImageBuffer = await sharp(req.file.path)
      .resize({ width: 800, height: 600 })
      .toBuffer();

    await fs.writeFile(req.file.path, resizedImageBuffer);
    const img_url = req.file.path;
    console.log(img_url);
    const image_data = {
      img_url,
      product_id: null,
      used: false,
    };
    const saved_image = await Gallery_model.create(image_data);
    res.json({ img_url });
    console.log(`"response ____________" ${img_url}"____________"`);
  } catch (error) {
    console.error("Error uploading image:", error);
    next(error);
  }
};
function isValidImageFormat(mimetype) {
  const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
  return allowedFormats.includes(mimetype);
}

module.exports.get_img = async (req, res) => {
  const imagePath = `uploads/${req.params.img}`;
  console.log(imagePath);
  const product = await Gallery_model.findOne({ img_url: imagePath });
  console.log("product:", product)
  if (!product || !product.img_url) {
    return res.status(404).json({ error: 'Изображение не найдено' });
  }
  const imageBuffer = await fs.readFile(imagePath);
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  res.end(imageBuffer);
  console.log('ok');
};

module.exports.deleteImage = async (req, res) => {
  try {
    const imagePath = `uploads/${req.params.img}`;
    await fs.unlink(imagePath);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
