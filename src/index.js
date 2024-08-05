// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("erro", error);
        throw error;
    })
   app.listen(process.env.PORT||3000, ()=>{
    console.log(`the app is listening on port : ${process.env.PORT}`);
})

})
.catch((error)=>{
    console.log("Mongodb connection fail :", error);
})



















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