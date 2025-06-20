const express=require("express")
const router=express.Router()
const{registerUser, loginUser,sendResentLink,resetPassword}=require("../controllers/userController")

router.post(
    "/register",
    registerUser
)
router.post("/login",
    loginUser)
module.exports=router

router.post("/request-reset",sendResentLink)
router.post("/reset-password/:token",resetPassword)
module.exports=router