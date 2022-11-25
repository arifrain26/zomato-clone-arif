import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/allModels";

import { s3Upload } from "../../utils/s3.js";
const Router = express.Router();

//multer configure
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
 *Route    /:_id
 *Des      Get image details
 *Param    _id
 *access   public
 *method   get
 */
Router.get("/:_id", async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params._id);
    return res.json({ image });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
 *Route    /image
 *Des      upload given image to s3 bucket and save file link to mongoDB
 *Param    _id
 *access   public
 *method   post
 */
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const bucketOptions = {
      Bucket: "zomato-clone-arif", //s3 bucket name
      Key: file.originalname, //file is now key
      Body: file.buffer, // file first store on buffer
      ContentType: file.mimetype,
      ACL: "public-read", //access control
    };

    const uploadImage = await s3Upload(bucketOptions);

    const dbUpload = await ImageModel.create({
      images: [{ location: uploadImage.Location }],
    });

    return res.status(200).json({ dbUpload });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
