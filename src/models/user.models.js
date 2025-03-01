import mongoose, {Schema} from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{
        type:String, 
        required: true,
        unique:true, 
        lowercase:true,
        trim:true,
        index:true
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    email:{
        type:String, 
        required: true,
         unique:true, 
        lowercase:true,
        trim:true

    },
    fullName:{
        type:String, 
        required: true,
        trim:true,
        index:true
    },
    avatar:{
         type:String // cloudinery url
    },
    coverImage:{
          type:String
    },
    password:{
      type:String, 
        required: true,
        min : [6, "Password should be atleast 6 letters"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

// hashing krna password ki
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      return next();
    }
    this.password = bcrypt.hash(this.password, 10)
    next()
})

//check password with encrpted password
userSchema.methods.isPasswordCorrect = async function(password){
  return await  bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccesToken = function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)