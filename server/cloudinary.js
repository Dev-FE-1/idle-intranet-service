import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImageToCloudinary(imageData) {
  const uploadResult = await cloudinary.uploader
    .upload(imageData, {
      upload_preset: 'profile',
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult.secure_url;
}

export { uploadImageToCloudinary };
