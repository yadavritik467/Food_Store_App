import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true,  },
    number: { type: Number, trim: true, default:null   },
    email: { type: String, trim: true, unique: true,  },
    access:{ type: String, default: 'registerForm' },
    googleId:{ type: String,trim:true, },
    password: { type: String,  select: false },
    // cpassword: { type: String,  select: false },
    address: { type: String, default:null },
    // role: { type: Number, default: 0 },
    role: { type: String,
       default: "user"
       },
       resetPasswordToken:String,
       resetPasswordExpires:Date,
    createdAt: { type: Date, default: Date.now }

}, { timestamps: true })

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,10)
  }
  next();
})

userSchema.methods.matchPassword = async function (password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = async function (){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}
userSchema.methods.getResetPasswordToken = async function (){
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpires = Date.now() + 10*60*10000;
  // console.log(resetToken)
  return this.resetPasswordToken ;


}

export const  User = mongoose.model("User", userSchema)

