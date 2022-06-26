const {Router} = require ("express")
const router = Router();
const librosCtrl = require("../controller/libros.controller")


// LIBROS //

router.get("/", librosCtrl.getStart);

router.get("/libros/:id", librosCtrl.getLibros);

router.get("/libros", librosCtrl.getLibros);

router.post("/libros", librosCtrl.postLibros);

router.put("/libros", librosCtrl.putLibros);

router.delete("/libros", librosCtrl.deleteLibros);




module.exports = router;