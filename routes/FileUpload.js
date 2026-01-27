import express from "express";
import localFileUpload, { imageSizeReducer, imageUpload, videoUpload } from "../controller/fileUpload.js";
const router = express.Router();

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageUploadReduced", imageSizeReducer);


export default router;
