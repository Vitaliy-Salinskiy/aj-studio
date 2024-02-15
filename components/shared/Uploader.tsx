"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useProductStore } from "@/store/productStore";

const Uploader = () => {
  const { toast } = useToast();
  const { setImage, isError, image } = useProductStore();

  return (
    <div className="h-[350px] lg:h-full relative">
      <UploadDropzone
        appearance={{
          container: `w-full h-full mt-0 border-[2px] ${
            isError ? "border-red-500" : "border-own-dark-blue"
          }`,
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
          setImage(res[0].url);
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "ERROR!",
            description: error.message,
          });
        }}
      />
    </div>
  );
};

export default Uploader;
