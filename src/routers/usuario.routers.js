const {Router} = require ("express")
const router = Router();
const usuarioCtrl = require("../controller/usuario.controller")


// USUARIO //

router.get("/", usuarioCtrl.getStart);

router.post("/registro", usuarioCtrl.postUsuario);

router.post("/login", usuarioCtrl.getUsuario);





module.exports = router;