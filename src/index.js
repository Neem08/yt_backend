// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})

connectDB()



















 /*

(async()=>{
    try{
         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         app.on("error", (error)=>{
            console.error("error:", error)
            throw error
         })

         app.listen(process.env.PORT, ()=>{
                  console.log(`app listening onn port ${process.env.PORT}`);
         })
    }
    catch(error){
        console.error("ERROR:",error)
        throw err
    }
})()  //iffy banake

*/