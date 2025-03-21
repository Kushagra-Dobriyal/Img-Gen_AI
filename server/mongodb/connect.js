import mongoose from "mongoose";


//while calling the url was send at that time we need to pass the url
function connectDB(url){

    //this is used to avoid the warning
    mongoose.set('strictQuery',true);

   return mongoose.connect(url)
    .then(()=>{
        console.log("DB connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default connectDB;