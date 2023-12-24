import {User} from "../modals/users.js"
import {sendPasswordResetEmail} from "../utils/sendPasswordResetEmail.js"
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import {sendOrderPlacedEvent} from "../utils/googleAnalitycal.js"
 

export const connectPassport = (res) => {
    passport.use(new GoogleStrategy({
        session:false,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://al-riz-food-store.onrender.com/auth/google/callback",
        // callbackURL: "http://localhost:4500/auth/google/callback",
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        scope: ['profile', 'email',
        //  'https://www.googleapis.com/auth/user.phonenumbers.read', 
        // 'https://www.googleapis.com/auth/user.addresses.read'
    ],
        passReqToCallback: true
    },
        async (req, res, accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({
                googleId: profile.id,
            })
            if (existingUser) {
                done(null, existingUser);
            } else {
                const user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    secret: accessToken,
                    access:"google",
                });
                done(null, user,);
            }
        }
    )
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(async (user, id, done) => {
        const newUser = await User.findById(id)
        done(null, newUser.id);
    })
}

export const register = async (req, res) => {
    try {
        const {name,number,email,password,cpassword,address} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: "User already registered",
                existingUser
            })
        }

        else if( !name || !number || !email || !address){
            return res.status(200).json({
                success: false,
                message: "please fill all the details.. ",
                
            })
        }
        
        else if( password !== cpassword){
            return res.status(200).json({
                success: false,
                message: "Password mistach",
                
            })
        } else{
            const user =  await User.create({
                name,number,email,password,address
            })
            // console.log(user)
            return res.status(200).json({
                success: true,
                message:"Registered successfully",
                user,
            })
        } 
       
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}



export const login = async (req, res, next) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")

        // console.log(user,req.body)
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist !! please create account ", user })
        }

        const isMatch = await user.matchPassword(password);
             if(!isMatch || isMatch === null ){
                return res.status(500).json({
                    success: false,
                    message:"Invalid password or email"
                })
             } else{
                const token = await user.generateToken();

                // console.log("login=>",user)
                return res.cookie("userID",token,{ 
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                     httpOnly: true,
                     sameSite: 'None', secure: true
                     }).json({
                    message: "login successfully",
                    token,
                    user
                })

                
             }
        

    } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Internal server errord" })
    }
}

export const logOut = async (req, res) => {
    try {
        if(req.cookies["userID"]){
            // console.log("userID cookie cleared")
            res.status(200)
            .cookie("userID", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({ success: true, message: "logout successfully" })

        }

        if(req.cookies["google"]){
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                }

                // Clear the userID cookie
                res.clearCookie('google');
                res.status(200).json({message:"logout successfully"});
                // console.log("google  cookie cleared")

            });

        }
        

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message, })
    }
}



export const myProfile = async(req,res) =>{
    try {
        // for login
        if(req.cookies["userID"]){
            const user = await User.findById(req.user._id);
        return res.status(200).json({
            success: true,
            user
        })
        }
        // for google
        if (req.cookies["google"]) {
            const user = await User.findById(req.user);
            // console.log(user)
            return res.status(200).json({
                success: true,
                user
            });
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }
} 

export const usersController = async (req, res) => {
    try {
        const user = await User.find({})
        return res.status(201).json({ message: "All users lists", user })
    } catch (err) {
        return res.status(500).json({ message: "error in getting all users" });
    }

}

// forgot password

export const forgotPassword = async (req, res) => {

    try {
        const user = await User.findOne({email:req.body.email})

    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    const resetPasswordToken = await user.getResetPasswordToken();

    await user.save();


    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendPasswordResetEmail({
            email:user.email,
            subject:"Reset Password",
            message
        })

        res.status(200).json({
            success: true,
            message:`Link sent to this ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        // user.resetPasswordExpires = undefined;
        await user.save();
        res.status(500).json({
                success: false,
                message: error.message
            })
    }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// reset password 

export const resetPassword = async (req, res) => {
    try {
        // const resetPasswordToken =  crypto.createHash("sha256").update(req.params.token).digest("hex");
        const resetPasswordToken = req.params.token;

        const user = await User.findOne({
            resetPasswordToken
           
        })
        // console.log(user)
       
        if(!user){
            return res.status(401).json({
                success: false,
                message:"Token is invalid or has expired"
            })
        }

        user.password = req.body.newPassword;
        user.resetPasswordToken = resetPasswordToken;
        // user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success:true,
            message:"password updated"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
  };

//   update profile

export const updateProfile = async(req,res) =>{
    try {
        const user =  await User.findById(req.user._id);
        const {name,number,email,address} = req.body;
        if(name){
            user.name = name;
        }
        if(number){
            user.number = number;
        }
        if(email){
            user.email = email;
        }
        if(address){
            user.address = address;
        }
        await user.save();
        res.status(200).json({
            success: true,
            message:"profile updated"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// delete user
export const deleteUsersController = async (req, res) => {
    try {
        const _id = req.params.id;
        // console.log(req.query)
        const user = await User.findByIdAndDelete(_id)
        return res.status(201).json({ message: " Deleted User " })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "error in deleting  user" });
    }

}