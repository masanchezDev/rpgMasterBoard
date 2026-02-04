import { useState, useEffect } from 'react';
import { useSceneStore } from '../../store/sceneStore';

const ObjectsLayer = () => {
  const { objects } = useSceneStore();
  const [displayedObjects, setDisplayedObjects] = useState([]);
  const [exitingObjects, setExitingObjects] = useState([]);

  useEffect(() => {
    const currentPaths = objects.map(o => o.path);
    const displayedPaths = displayedObjects.map(o => o.path);

    const removedObjects = displayedObjects.filter(
      o => !currentPaths.includes(o.path)
    );

    if (removedObjects.length > 0) {
      setExitingObjects(removedObjects.map(o => o.path));
      setTimeout(() => {
        setDisplayedObjects(objects);
        setExitingObjects([]);
      }, 300);
    } else {
      setDisplayedObjects(objects);
    }
  }, [objects]);

  const allObjects = [...displayedObjects];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
      {allObjects.map((object) => (
        <div
          key={object.path}
          className={`relative flex items-center justify-center ${
            exitingObjects.includes(object.path)
              ? 'animate-fadeOutDown'
              : 'animate-fadeInUp'
          }`}
        >
          <div 
            className="absolute inset-0 rounded-full bg-black/70 blur-3xl"
            style={{
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%'
            }}
          />
          <img
            src={object.path}
            alt={object.name}
            className="relative max-w-[50vw] max-h-[50vh] object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default ObjectsLayer;
