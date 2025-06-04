const express =require("express")
const router=express.Router()
const productController=require("../../controllers/admin/productmanagement")
const upload = require("../../middlewares/fileupload")
//can be imported
// previously
//const {createProduct}=require("../../controllers/admin/productmanagement")
//per function

router.post(
        "/",
        upload.single("image"),
    productController.createProduct 
)
router.get(
    "/",
    productController.getProducts

)
module.exports=router