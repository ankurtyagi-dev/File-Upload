import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";
import database from "./config/database.js";
import cloudinary from "./config/cloudinary.js";
import Upload from "./routes/FileUpload.js"

const app = express();
const PORT = process.env.PORT || 3000;
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
database();
cloudinary();
app.use("/api/v1/upload", Upload);


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
