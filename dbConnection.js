
import mongoose from "mongoose"
import 'dotenv/config';


let dbConnection;

export const db = async () => {
  if (!dbConnection) {
    dbConnection = await mongoose.connect(process.env.MONGO_URL)
   
      .then(() => {
        console.log("Db Connected Successfully");
        return mongoose.connection; // Return the connection
      })
      .catch((error) => {
        console.log("Error while connecting to Db", error);
        throw new Error("Database connection failed");
      });
  }
  return dbConnection;
};
