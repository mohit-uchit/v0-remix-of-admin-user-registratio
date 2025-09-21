import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result?.secure_url || "")
          }
        },
      )
      .end(buffer)
  })
}

export async function uploadProfilePhoto(file: File): Promise<string> {
  return uploadToCloudinary(file, "user-profiles")
}

export async function uploadQRCode(file: File): Promise<string> {
  return uploadToCloudinary(file, "user-qrcodes")
}

export default cloudinary
