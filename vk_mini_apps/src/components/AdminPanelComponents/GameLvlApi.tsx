import { useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useCreateLvl } from "../../hooks/useCreateLvl";
import { useGetLvls } from "../../hooks/useGetLvls";
import { useGetLvlById } from "../../hooks/useGetLvlById";
import { useDeleteLvlById } from "../../hooks/useDeleteLvlById";
interface GameLvlApiProps {
  className?: string;
  uploadData: {
    id: number;
    url: string;
  };
}

export const GameLvlApi: React.FC<GameLvlApiProps> = ({
  className = "",
  uploadData,
}) => {
  const [lvl, setLvl] = useState<number>(0);
  const [lvlId, setLvlId] = useState<number>(1);
  const [duration, setDuration] = useState<number>(0);
  const [countCatOnLvl] = useState<number>(5);
  const [crop, setCrop] = useState<Crop>();
  const [numberGameLvlCat, setNumberGameLvlCat] = useState(1);
  const [GameLvlCatsList, setGameLvlCatsList] = useState<GameLvlCatItem[]>([]);

  const { data } = useGetLvls();
  const { data: lvlB, refetch: refetchLvlById } = useGetLvlById(lvlId);
  const { mutate: deleteLvlById } = useDeleteLvlById();

  type GameLvlCatItem = {
    fileId: number;
    unit: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };

  const onCreateGameLvlCat = () => {
    setNumberGameLvlCat(numberGameLvlCat + 1);

    setGameLvlCatsList([
      ...GameLvlCatsList,
      {
        fileId: numberGameLvlCat,
        unit: crop?.unit || "",
        x: crop?.x || 0,
        y: crop?.y || 0,
        width: crop?.width || 0,
        height: crop?.height || 0,
      },
    ]);

    if (crop) {
      crop.x = 0;
      crop.y = 0;
      crop.width = 0;
      crop.height = 0;
    }
  };

  const { mutate: createLvl, error: createLvlError } = useCreateLvl();

  const onCreateGameLvl = () => {
    if (lvl > 0 && duration > 0 && GameLvlCatsList.length === countCatOnLvl) {
      createLvl(
        {
          lvl: lvl,
          duration: duration,
          gameLvlCats: GameLvlCatsList,
        },
        {
          onSuccess: () => {
            console.log(`Successfully created/updated game level ${lvl}`);
          },
          onError: (error) => {
            console.error(`Failed to create/update game level ${lvl}:`, error);
          },
        },
      );
    } else {
      console.error(
        "Invalid data: Ensure that lvl, duration, and GameLvlCatsList are properly set.",
      );
    }
  };

  const onGetLvlById = () => {
    refetchLvlById();
  };

  const onDeleteLvlById = () => {
    deleteLvlById(lvlId);
  };

  return (
    <div className={className}>
      <h2 className="text-center text-2xl">Create GameLvl</h2>
      <div className="border-2 border-black p-4">
        <h3>GameLvl</h3>
        <input
          type="number"
          placeholder="Enter lvl"
          onChange={(e) => setLvl(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Enter duration"
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        {uploadData && (
          <>
            <p>x: {crop?.x}</p>
            <p>y: {crop?.y}</p>
            <p>width: {crop?.width}</p>
            <p>height: {crop?.height}</p>
            <p>unit: {crop?.unit}</p>
            <ReactCrop
              crop={crop}
              onChange={(crop, percentCrop) => {
                setCrop(percentCrop);
              }}
            >
              <img src={"https://fc.nxt.zbc.su/" + uploadData.url} />
            </ReactCrop>
            {numberGameLvlCat <= countCatOnLvl && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onCreateGameLvlCat}
              >
                <p>
                  {numberGameLvlCat + " "}
                  create cat
                </p>
              </button>
            )}
            {GameLvlCatsList.length === countCatOnLvl && (
              <button
                onClick={onCreateGameLvl}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                create lvl
              </button>
            )}
            {createLvlError && (
              <p>Error creating level: {createLvlError.message}</p>
            )}
            <details>
              <summary>GameLvlCats</summary>
              <div>
                {GameLvlCatsList.length > 0 ? (
                  <>
                    {GameLvlCatsList.map((cat, index) => (
                      <div key={index} className="game-lvl-cat-item">
                        <h3>Game Level Category {index + 1}</h3>
                        <p>File ID: {cat.fileId}</p>
                        <p>Unit: {cat.unit}</p>
                        <p>
                          X: {cat.x}, Y: {cat.y}
                        </p>
                        <p>
                          Width: {cat.width}, Height: {cat.height}
                        </p>
                        <br />
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No game level categories yet.</p>
                )}
              </div>
            </details>
          </>
        )}
        {data && (
          <>
            <details>
              <summary>lvls list</summary>
              {data.map(
                (lvl: {
                  lvl: number;
                  duration: number;
                  created: string;
                  id: number;
                }) => (
                  <div key={lvl.id} className="border-2 border-black">
                    <p>id: {lvl.id}</p>
                    <p>duration: {lvl.duration}</p>
                    <p>created: {lvl.created}</p>
                    <p>lvl: {lvl.lvl}</p>
                  </div>
                ),
              )}
            </details>
          </>
        )}
        <h3>get lvl byId</h3>
        <input
          type="number"
          placeholder="Enter lvl"
          onChange={(e) => setLvlId(Number(e.target.value))}
        />
        <button
          onClick={onGetLvlById}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Get Level by id
        </button>
        {lvlB && (
          <div className="border-2 border-black p-2 mt-4">
            <h4>Level Details:</h4>
            <p>ID: {lvlB.id}</p>
            <p>Level: {lvlB.lvl}</p>
            <p>Duration: {lvlB.duration}</p>
            <p>Created: {lvlB.created}</p>
          </div>
        )}
        <button
          onClick={onDeleteLvlById}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Delete Level by id
        </button>
      </div>
    </div>
  );
};
