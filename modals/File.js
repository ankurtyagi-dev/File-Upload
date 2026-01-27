import mongoose from "mongoose";
import nodemailer from "nodemailer";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    // console.log(doc);
    //transporter
    let transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //send mail
    let info = await transport.sendMail({
      from: "ankur",
      to: doc.mail,
      subject: "New File Uploaded on Cloudinary",
      html: `<h2> Hello </h2> <p>File Uploaded</p>`,
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
});

const File = new mongoose.model("File", fileSchema);
export default File;
