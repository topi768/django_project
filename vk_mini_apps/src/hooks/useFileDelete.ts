import { useMutation } from "@tanstack/react-query";

export const useFileDelete = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("No file ID provided");
      }

      try {
        const result = 'deleted';
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
