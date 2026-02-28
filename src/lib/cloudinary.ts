import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadImage = async (file: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'portfolio-projects',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
