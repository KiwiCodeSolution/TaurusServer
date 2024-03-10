const Router = require("express");
const router = new Router();
const controller = require("../controllers/product_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

// поставить auth_middleware после тестирования

router.get("/", ctrlWrapper(controller.get_all_products));
router.post("/", ctrlWrapper(controller.create_product));
router.put("/:id", ctrlWrapper(controller.update_product));
router.delete("/:id", ctrlWrapper(controller.delete_product));
module.exports = router;
