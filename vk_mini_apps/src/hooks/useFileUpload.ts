import { useMutation } from "@tanstack/react-query";
import { fileUpload } from "../api/admin/fileStorage";

export const useFileUpload = () => {
  return useMutation({
    mutationFn: async (file: File | null) => {
      if (!file) {
        throw new Error("No file provided");
      }

      try {
        const result = await fileUpload(file);

        return result;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    },
    retry: 3,
  });
};
