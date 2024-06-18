const Router = require("express");
const router = new Router();
const controller = require("../controllers/product_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware");
const superadmin = require("../middlewares/superuer_middleware");

router.get("/", ctrlWrapper(controller.get_all_products));
router.get("/:id", ctrlWrapper(controller.get_product_by_id));
router.post("/", auth, ctrlWrapper(controller.create_product));
router.put("/:id", auth, ctrlWrapper(controller.update_product));
router.delete("/:id", auth, superadmin, ctrlWrapper(controller.delete_product));

module.exports = router;
