import { useSceneStore } from '../../store/sceneStore';

const BackgroundLayer = () => {
  const { background } = useSceneStore();

  if (!background) return null;

  return (
    <div 
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    />
  );
};

export default BackgroundLayer;
