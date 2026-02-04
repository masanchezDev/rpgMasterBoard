import { useSceneStore } from '../../store/sceneStore';

const BlackoutLayer = () => {
  const { blackout } = useSceneStore();

  return (
    <div 
      className={`absolute inset-0 z-50 transition-opacity duration-500 pointer-events-none ${
        blackout ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: 'url(/assets/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000'
      }}
    />
  );
};

export default BlackoutLayer;
