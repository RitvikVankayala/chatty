
const { reg, login,setAvatar,getAllUsers } = require("../controllers/usercontrollers");


const router = require("express").Router();
router.post("/reg",reg);
router.post("/login",login);
router.post("/setavatar/:id", setAvatar);
router.get('/allusers/:id',getAllUsers);

module.exports =router;