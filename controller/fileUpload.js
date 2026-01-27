import File from "../modals/File.js";
import { v2 as cloudinary } from "cloudinary";

const localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);
    let path =
      import.meta.dirname +
      "/files/" +
      Date.now() +
      `.${file.name.split(".").pop()}`;
    console.log(path);
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder, resource_type: "auto" };
  if(quality) {
    options.quality = quality;
  }
  const result = await cloudinary.uploader.upload(file.tempFilePath, options);
  return result;
}

//image upload handler
const imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    // console.log(name, tags, email);
    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".").pop();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    //File format supported
    const response = await uploadFileToCloudinary(file, "ankur");
    // console.log(response);

    //save entry in db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.videoFile;

    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".").pop();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // if ((file.size > 5, 242, 880)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "File size is greater than 5mb",
    //   });
    // }

    const response = await uploadFileToCloudinary(file, "ankur");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "Video Successfully Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const imageSizeReducer = async (req, res) => {
 try {
    //data fetch
    const { name, tags, email } = req.body;
    // console.log(name, tags, email);
    const file = req.files.imageFile;
    // console.log(file);
    
    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".").pop();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    
    //File format supported
    const response = await uploadFileToCloudinary(file, "ankur", 30);
    // console.log(response);

    //save entry in db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

export { imageUpload, videoUpload, imageSizeReducer };
export default localFileUpload;
