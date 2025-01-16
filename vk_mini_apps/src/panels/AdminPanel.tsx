// import { FC, useState } from "react";
// import { Panel, NavIdProps } from "@vkontakte/vkui";
// import { UserInfo } from "@vkontakte/vk-bridge";
// import { useFileDelete } from "../hooks/useFileDelete";
// import { GameLvlApi } from "./../components/AdminPanelComponents/GameLvlApi";

// import "react-image-crop/dist/ReactCrop.css";

// export interface AdminPanelProps extends NavIdProps {
//   fetchedUser?: UserInfo;
// }

// export const AdminPanel: FC<AdminPanelProps> = ({ id }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [fileName, setFileName] = useState<string | undefined>();

//   const {
//     data: achievementData,
//     isPending: isAchievementPending,
//     error: achievementError,
//   } = useGetAchiement();

//   const {
//     mutate: uploadFile,
//     isPending: isUploadPending,
//     error: uploadError,
//     data: uploadData,
//   } = useFileUpload();

//   const {
//     mutate: deleteFile,
//     isPending: isDeletePending,
//     error: deleteError,
//     data: deleteData,
//   } = useFileDelete();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       uploadFile(selectedFile);
//     }
//   };

//   const handleDelete = () => {
//     if (fileName) {
//       deleteFile(fileName);
//     }
//   };

//   return (
//     <Panel id={id}>
//       <h2 className="text-center text-2xl">Admin File Storage</h2>
//       <div className="border-2 border-black p-4">
//         <h3>Upload img</h3>
//         <input
//           accept=".jpg,.jpeg,.png,.webp,.gif,.svg"
//           type="file"
//           onChange={handleFileChange}
//         />
//         <button
//           className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//           onClick={handleUpload}
//           disabled={isUploadPending}
//         >
//           Upload
//         </button>
//         {isUploadPending && <p>Uploading...</p>}
//         {uploadError && <p>Error uploading img: {uploadError.message}</p>}
//         {uploadData && (
//           <div>
//             <p>Upload successful!</p>
//             <p>img URL: {uploadData.url}</p>
//             <p>img ID: {uploadData.id}</p>
//           </div>
//         )}
//       </div>
//       <div className="border-2 border-black p-4">
//         <h3>Delete File by ID</h3>
//         <div>
//           <input
//             type="text"
//             placeholder="Enter file src"
//             onChange={(e) => setFileName(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//             onClick={handleDelete}
//             disabled={isDeletePending}
//           >
//             Delete File
//           </button>
//           {isDeletePending && <p>Deleting...</p>}
//           {deleteError && <p>Error deleting file: {deleteError.message}</p>}
//           {deleteData && <p>File deleted successfully!</p>}
//         </div>
//       </div>

//       <h2 className="text-center text-2xl">Admin Achievement API</h2>

//       <div className="border-2 border-black p-4">
//         <h3>Achievement</h3>
//         {isAchievementPending && <p>Loading achievement...</p>}
//         {achievementError && (
//           <p>Error loading achievement: {achievementError.message}</p>
//         )}
//         {achievementData && <div>{achievementData}</div>}
//       </div>

//       <GameLvlApi uploadData={uploadData} />
//     </Panel>
//   );
// };
