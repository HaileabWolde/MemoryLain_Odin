import {useRef, useState} from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { LuMicOff } from 'react-icons/lu'; // Import the MicOff icon from the Lucide set 
const AudioPlayerComponent = ({src})=> {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      {/* The HTML audio element is hidden (controls removed) and controlled via ref */}
      <audio ref={audioRef} src={src}  onEnded={() => setIsPlaying(false)} />
      {
        isPlaying ? <FaMicrophone 
      color='whitesmoke' 
      cursor='pointer'  
      size={54} fontWeight={900} onClick={togglePlayPause}/> : 
      <LuMicOff
      color='whitesmoke' 
      cursor='pointer'  
      size={54} fontWeight={900} onClick={togglePlayPause}
      />
      }
      
    </div>
  );
}
export default AudioPlayerComponent;