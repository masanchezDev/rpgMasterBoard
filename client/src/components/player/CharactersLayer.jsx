import { useSceneStore } from '../../store/sceneStore';

const CharactersLayer = () => {
  const { characters } = useSceneStore();

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {characters.map((character) => (
        <img
          key={character.path}
          src={character.path}
          alt={character.name}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 max-h-[80%] object-contain"
          style={{
            left: `${character.x}%`,
            top: `${character.y}%`,
            transform: `translate(-50%, -50%) scale(${character.scale || 1})`
          }}
        />
      ))}
    </div>
  );
};

export default CharactersLayer;
