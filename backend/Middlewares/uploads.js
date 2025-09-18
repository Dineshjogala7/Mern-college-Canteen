const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");

const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params:async (req,file) =>{
        return{
            folder:"itemImages",
            allowed_formats:["jpg","jpeg","png","webp"],
            public_id:file.originalname.split(".")[0]+"-"+Date.now()
        };
    }
});

const upload = multer({storage:storage});

module.exports = upload;
