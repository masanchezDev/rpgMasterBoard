import { useSceneStore } from '../../store/sceneStore';

const ObjectsLayer = () => {
  const { objects } = useSceneStore();

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {objects.map((object) => (
        <img
          key={object.path}
          src={object.path}
          alt={object.name}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 object-contain"
          style={{
            left: `${object.x}%`,
            top: `${object.y}%`,
            transform: `translate(-50%, -50%) scale(${object.scale || 1})`
          }}
        />
      ))}
    </div>
  );
};

export default ObjectsLayer;
