const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/", userController.products);
router.post("/addcart", userController.addcart);  
router.post("/addwishlist", userController.addwishlist);  
router.post("/count", userController.count);  
router.post("/removecart", userController.removecart);  
router.get("/checkout", userController.checkout);  
router.get("/notifications", userController.notifications);  
router.post("/cuponapplay", userController.cuponapplay);  
router.get("/placeorder", userController.placeorder);  

module.exports = router;