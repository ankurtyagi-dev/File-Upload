import mongoose from "mongoose";
import "dotenv/config";

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.log("Database Connection Issues");
    });
};

export default connect;
