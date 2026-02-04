import { useState, useEffect } from 'react';
import { useSceneStore } from '../../store/sceneStore';

const BackgroundLayer = () => {
  const { background } = useSceneStore();
  const [currentBg, setCurrentBg] = useState(background);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (background !== currentBg) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentBg(background);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [background, currentBg]);

  if (!currentBg) return null;

  return (
    <div 
      className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ 
        backgroundImage: `url(${currentBg})`,
        filter: 'blur(2px)'
      }}
    />
  );
};

export default BackgroundLayer;
