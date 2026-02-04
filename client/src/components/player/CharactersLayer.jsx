import { useState, useEffect } from 'react';
import { useSceneStore } from '../../store/sceneStore';

const CharactersLayer = () => {
  const { characters } = useSceneStore();
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [exitingCharacters, setExitingCharacters] = useState([]);

  useEffect(() => {
    const currentPaths = characters.map(c => c.path);
    const displayedPaths = displayedCharacters.map(c => c.path);

    const removedCharacters = displayedCharacters.filter(
      c => !currentPaths.includes(c.path)
    );

    if (removedCharacters.length > 0) {
      setExitingCharacters(removedCharacters.map(c => c.path));
      setTimeout(() => {
        setDisplayedCharacters(characters);
        setExitingCharacters([]);
      }, 300);
    } else {
      setDisplayedCharacters(characters);
    }
  }, [characters]);

  const allCharacters = [...displayedCharacters];

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex justify-center items-end transition-all duration-300">
      {allCharacters.map((character, index) => (
        <img
          key={character.path}
          src={character.path}
          alt={character.name}
          className={`max-h-[80vh] object-contain ${
            exitingCharacters.includes(character.path)
              ? 'animate-fadeOutDown'
              : 'animate-fadeInUp'
          }`}
          style={{
            transformOrigin: 'bottom center',
            marginLeft: index > 0 ? '-10%' : '0',
            zIndex: index,
            transition: 'margin-left 0.3s ease-out'
          }}
        />
      ))}
    </div>
  );
};

export default CharactersLayer;
