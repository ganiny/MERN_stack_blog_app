const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Upload Image Function
module.exports.cloudinaryUploadImage = async(fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: "auto",
        });
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error(cloudinary)");
    }
};

// Cloudinary Remove Image Function
module.exports.cloudinaryRemoveImage = async(imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error(cloudinary)");
    }
};

// Cloudinary Remove Many Images Function
module.exports.cloudinaryRemoveImages = async(publicIdsArray) => {
    try {
        const result = await cloudinary.v2.api.delete_resources(publicIdsArray);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error(cloudinary)");
    }
};