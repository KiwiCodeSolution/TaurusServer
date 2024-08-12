const Router = require("express");
const router = new Router();
const img_controller = require("../controllers/img_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware")

// поставить auth_middleware после тестирования
router.post("/",auth, img_controller.upload.single("image"), ctrlWrapper(img_controller.upload_img));

router.get("/:img", ctrlWrapper(img_controller.get_img));

module.exports = router;


