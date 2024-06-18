const Router = require("express");
const router = new Router();
const order_controller = require("../controllers/order_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware");
const superadmin = require("../middlewares/superuer_middleware");

router.post("/", ctrlWrapper(order_controller.create_order));
router.get('/:id', ctrlWrapper(order_controller.get_order_by_id));
router.get('/', auth, ctrlWrapper(order_controller.get_all_orders));
router.put('/:id', auth, ctrlWrapper(order_controller.update_order));
router.delete('/:id', auth, superadmin, ctrlWrapper(order_controller.delete_order));

module.exports = router;