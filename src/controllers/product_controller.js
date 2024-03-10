const Product_model = require("../mongoDB/models/Product");

const { NotFound, Conflict } = require("http-errors");



module.exports.create_product = async (req, res) => {
  const { body, files } = req;
  const newProduct = { ...body };
  const existingProduct = await Product_model.findOne({
    name: newProduct.name,
  });
  if (existingProduct) {
    throw new Conflict("Продукт з такою назвою вже існує");
  }
  const saved_product = await Product_model.create({ ...newProduct });
  res
    .status(201)
    .json({ product: saved_product, message: "product created successfully" });
};

module.exports.get_all_products = async (req, res) => {
  const products = await (await Product_model.find()).reverse();
  res.status(200).json(products);
};

module.exports.update_product = async (req, res) => {
  const productId = req.params.id;
  const { body, files } = req;
  const productToUpdate = { images: [], ...body };
  const currentProduct = await Product_model.findById(productId);
  const updated_product = await Product_model.findByIdAndUpdate(
    productId,
    { ...productToUpdate },
    { new: true }
  );
  if (!updated_product) {
    throw new NotFound("product not found");
  }
  if (currentProduct.images) {
    currentProduct.images.forEach((image) => {
      if (!updated_product.images.includes(image)) {
        deleteOldImage(image);
      }
    });
  }
  res.json({ data: updated_product, message: "updated successfully" });
};

module.exports.delete_product = async (req, res) => {
  const product = await Product_model.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new NotFound("product not found");
  }
  res.json({ message: "Product deleted successfully" });
};
