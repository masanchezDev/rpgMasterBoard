import { useEffect, useRef } from 'react';
import { useSceneStore } from '../../store/sceneStore';

const AudioPlayer = () => {
  const musicRef = useRef(null);
  const soundRef = useRef(null);
  const { music, sound, clearSound } = useSceneStore();

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = music.volume;
    }
  }, [music.volume]);

  useEffect(() => {
    if (musicRef.current) {
      if (music.src && music.playing) {
        musicRef.current.src = music.src;
        musicRef.current.play().catch(console.error);
      } else {
        musicRef.current.pause();
      }
    }
  }, [music.src, music.playing]);

  useEffect(() => {
    if (sound && soundRef.current) {
      soundRef.current.src = sound;
      soundRef.current.play().catch(console.error);
      clearSound();
    }
  }, [sound, clearSound]);

  return (
    <>
      <audio ref={musicRef} loop hidden />
      <audio ref={soundRef} hidden />
    </>
  );
};

export default AudioPlayer;
