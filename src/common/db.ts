import mongoose from 'mongoose'

const MONGO_URI = 'mongodb://mongodb:27017/js-api'
export default async function dbConnect(){
  try{
    if(mongoose.connection.readyState === 1){
      console.log("Already connected");
      return
    }

    const connectionString = MONGO_URI
    if (!connectionString) {
      throw new Error('MONGODB_URI environment variable is not set')
    }

    await mongoose.connect(connectionString,{
      serverSelectionTimeoutMS:3000
    }).catch(err => {
      console.log("Error connecting to DB, is it running?")
    })
  }catch(error: any){
    console.error("Something went wrong", error.message);
    process.exit(1)
  }
}
