import { useMutation } from "@tanstack/react-query";
import { deleteLvlById } from "../api/admin/gameLvl";

export const useDeleteLvlById = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      if (!id) {
        throw new Error("No file ID provided");
      }

      try {
        const result = await deleteLvlById(id);
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
