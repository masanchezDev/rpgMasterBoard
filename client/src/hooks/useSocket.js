import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useSceneStore } from '../store/sceneStore';

const SOCKET_URL = 'http://localhost:3001';

export const useSocket = (isController = false) => {
  const socketRef = useRef(null);
  const { setAssets, syncScene, playSound, clearSound, getSceneState } = useSceneStore();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('assets', (assets) => {
      setAssets(assets);
    });

    socketRef.current.on('scene_sync', (scene) => {
      syncScene(scene);
    });

    socketRef.current.on('scene_update', (scene) => {
      syncScene(scene);
    });

    socketRef.current.on('play_sound', (sound) => {
      playSound(sound);
      setTimeout(() => clearSound(), 100);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [setAssets, syncScene, playSound, clearSound]);

  const emitSceneUpdate = useCallback((partialUpdate) => {
    if (socketRef.current && isController) {
      const currentState = getSceneState();
      const newState = { ...currentState, ...partialUpdate };
      socketRef.current.emit('update_scene', newState);
    }
  }, [isController, getSceneState]);

  const emitSound = useCallback((sound) => {
    if (socketRef.current && isController) {
      socketRef.current.emit('play_sound', sound);
    }
  }, [isController]);

  const requestAssets = useCallback(() => {
    socketRef.current?.emit('request_assets');
  }, []);

  return { emitSceneUpdate, emitSound, requestAssets };
};
