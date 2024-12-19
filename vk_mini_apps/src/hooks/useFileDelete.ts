import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "../api/admin/fileStorage";

export const useFileDelete = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("No file ID provided");
      }

      try {
        const result = await deleteFile(id);
        console.log("File deleted:", result);

        return result;
      } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
      }
    },
    retry: 3,
  });
};
