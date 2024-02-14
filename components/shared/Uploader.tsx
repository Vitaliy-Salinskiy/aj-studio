"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useToast } from "@/components/ui/use-toast";

const Uploader = () => {
  const { toast } = useToast();

  return (
    <UploadDropzone
      appearance={{
        container: "w-full h-96 mt-0",
        button: "bg-own-light-red after:bg-red-600/90",
        label: "text-own-light-red hover:text-red-600",
        allowedContent: "text-own-dark-blue",
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        toast({
          title: "SUCCESS!",
          description: "Image uploaded successfully",
        });
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "ERROR!",
          description: error.message,
        });
      }}
    />
  );
};

export default Uploader;
