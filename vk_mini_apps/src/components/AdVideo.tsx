import React, { useRef, useState, useEffect } from "react";
import "./AdVideo.css";

interface AdVideoProps {
    onEnd: () => void;
}
const SKIP_TIME = 5
const AdVideo: React.FC<AdVideoProps> = ({onEnd}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isAdFinished, setIsAdFinished] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isSkipButtonVisible, setIsSkipButtonVisible] = useState<boolean>(false);
  const handleEnded = () => {
    setIsAdFinished(true);
    onEnd();
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = 0.01;
    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTimeSec(Math.ceil(video.currentTime));
      if (video.currentTime > SKIP_TIME) {
        setIsSkipButtonVisible(true);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };



    // Блокируем контекстное меню (правую кнопку мыши) на видео
    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("contextmenu", disableContextMenu);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <div className="ad-container relative">

      {/* Видео с кнопками громкости и паузы, но без перемотки и изменения скорости */}
      <video
        ref={videoRef}
        className="ad-video"
        autoPlay
        controls
        disableRemotePlayback
        controlsList="noplaybackrate nodownload noseek"
      >
        <source src="/src/assets/AdVideo.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
        {isSkipButtonVisible &&(
             <button onClick={handleEnded}    
             className=" absolute right-2 top-2 bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-xl opacity-40 hover:opacity-90 transition-opacity duration-200"

>Пропустить</button>
        )}
      {/* Кастомная желтая полоса прогресса */}
      <div className="progress-bar absolute bottom-0">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    
       
      {/* Кнопка появляется только после завершения видео
      {isAdFinished && <button onClick={() => alert("Вы получили 10 баллов!")}>Получить баллы</button>} */}
    </div>
  );
};

export default AdVideo;
