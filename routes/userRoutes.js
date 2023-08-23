import express from "express";
import jwt from "jsonwebtoken";
import { register, login, usersController, deleteUsersController, forgotPassword, resetPassword, myProfile, logOut, updateProfile } from "../controller/users-controllers.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import passport from 'passport';
const router = express.Router()




router.post("/login", login)


// --------------------------------------------------------- google authentication

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile","email",
        //  'https://www.googleapis.com/auth/user.addresses.read',
        //   'https://www.googleapis.com/auth/user.phonenumbers.read'
        ]
    }))

router.get("/google/callback", passport.authenticate('google',
//  {  successRedirect: "http://localhost:3000",}),
 {  successRedirect: "https://al-riz-food-store.onrender.com",}),
);

// --------------------------------------------------------- google authentication ends here
   
router.post("/register", register)
router.post("/forgotPassword", forgotPassword)

router.put("/password/reset/:token", resetPassword)
router.put("/updateProfile/:id", requireSignIn, updateProfile)

    router.get("/getUser",requireSignIn, usersController)
router.get("/logout",requireSignIn,logOut)
router.get("/myProfile",requireSignIn,myProfile)

router.delete("/delete-users",requireSignIn, deleteUsersController)













export default router