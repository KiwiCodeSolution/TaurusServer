const Router = require("express");
const router = new Router();
const auth_controller = require("../controllers/auth_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware")
//const superadmin = require("../middlewares/superuer_middleware")


router.post("/login", ctrlWrapper(auth_controller.login));
router.get("/logout", auth, ctrlWrapper(auth_controller.logout));
router.get("/getCurrent", auth, ctrlWrapper(auth_controller.getCurrent));
router.get("/all", auth, ctrlWrapper(auth_controller.getAllUsers)); 
//router.put('/:id', auth, ctrlWrapper(auth_controller.toggleUserActivation)); 
//router.post('/reset_password', auth, superadmin, ctrlWrapper(auth_controller.resetPassword));
router.post("/register", ctrlWrapper(auth_controller.register));
module.exports = router;
