const express= require("express")
const router =express.Router()
const {createUser,getOneUser, deleteOne, getUsers, updateOne }
=require("../../controllers/admin/usermanagement")

const{authenticateUser, isAdmin}=require("../../middlewares/authorizedUser")
//5 common api route 
router.post(
    "/",
    createUser
)
router.get(
    "/",
    authenticateUser, 
    isAdmin,// next() goes to next getUser.
    getUsers
)
router.get(
    "/:id",
    getOneUser

)
router.put(
    "/:id",
    updateOne
)
router.delete(
    "/:id",
    deleteOne
)
module.exports=router