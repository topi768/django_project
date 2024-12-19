import { apiUrls, instance } from "../instance";

export const fileUpload = async (file: File | null) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    apiUrls.admin.fileStorage.upload,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    },
  );

  return response.data;
};

export const deleteFile = async (id: string) => {
  if (!id) {
    throw new Error("No file ID provided");
  }

  const response = await instance.delete(
    `${apiUrls.admin.fileStorage.delete}/${id}`,
    {
      timeout: 10000,
    },
  );

  return response.data;
};
