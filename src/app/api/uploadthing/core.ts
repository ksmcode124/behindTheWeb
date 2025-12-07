import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Image uploader untuk foto anggota (NO AUTH)
  imageUploader: f({ 
    image: { 
      maxFileSize: "1MB", 
      maxFileCount: 1 
    } 
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete!");
      console.log("File URL:", file.url);
      
      // Return URL ke client
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
