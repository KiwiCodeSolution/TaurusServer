const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require("../config/mongoConfig.json");
const Product_model = require('../mongoDB/models/Product');

mongoose.connect(`mongodb://${config.development.host}:${config.development.port}/${config.development.database}`
);

const filePath = path.join(__dirname, 'test.products.json');

async function importProducts() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);

    for (let product of products) {
      const newProduct = {
        topCategory: product.topCategory,
        subCategory: product.subCategory,
        category: product.category,
        weight: product.weight,
        name: product.name,
        englishName: product.englishName,
        description: product.description,
        price: product.price,
        action: product.action,
        new: product.new,
        discount: product.discount,
        archive: product.archive,
        displayInDeliveryMenu: product.displayInDeliveryMenu,
        hideInMenu: product.hideInMenu,
        available: product.available,
        createdAt: new Date(product.createdAt["$date"]),
        updatedAt: new Date(product.updatedAt["$date"])
      };
     
      const existingProduct = await Product_model.findOne({ name: newProduct.name });
      if (!existingProduct) {
        await Product_model.create(newProduct);
        console.log(`Продукт ${newProduct.name} успішно додано`);
      } else {
        console.log(`Продукт ${newProduct.name} вже існує`);
      }
    }
  } catch (error) {
    console.error("Помилка при імпорті продуктів:", error);
  } finally {
    mongoose.connection.close();
  }
}

importProducts();
