const router = require("express").Router();

const controller = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const { authLoginDto, authRegisterDto } = require("../validations/auth.validations");

/**
 * route function is use to controle specific http methods
 */
router.post("/register", validate(authRegisterDto), controller.register);

router.post("/login", validate(authLoginDto), controller.login);

module.exports = router;
