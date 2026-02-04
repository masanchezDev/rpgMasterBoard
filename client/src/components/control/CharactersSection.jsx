import { useState } from 'react';
import { useSceneStore } from '../../store/sceneStore';
import SearchBar from './SearchBar';

const CharactersSection = ({ onUpdate }) => {
  const { assets, characters, toggleCharacter, clearAllCharacters } = useSceneStore();
  const [search, setSearch] = useState('');

  const handleToggle = (character) => {
    toggleCharacter(character);
    const exists = characters.find(c => c.path === character.path);
    const newCharacters = exists
      ? characters.filter(c => c.path !== character.path)
      : [...characters, { ...character, scale: 0.7 }];
    onUpdate({ characters: newCharacters });
  };

  const handleClearAll = () => {
    clearAllCharacters();
    onUpdate({ characters: [] });
  };

  const isActive = (path) => characters.some(c => c.path === path);

  const filteredCharacters = assets.characters
    .filter(char => char.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aActive = isActive(a.path);
      const bActive = isActive(b.path);
      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;
      return 0;
    });

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-100">Characters</h2>
        {characters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-3 py-1 rounded text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
          >
            Hide All
          </button>
        )}
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search characters..." />
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredCharacters.map((char) => (
          <div
            key={char.path}
            className="flex items-center gap-3 p-2 rounded bg-gray-700"
          >
            <img
              src={char.path}
              alt={char.name}
              className="w-12 h-12 object-contain rounded"
            />
            <span className="flex-1 text-sm text-gray-200 truncate">{char.name}</span>
            <button
              onClick={() => handleToggle(char)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isActive(char.path)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
              }`}
            >
              {isActive(char.path) ? 'Visible' : 'Hidden'}
            </button>
          </div>
        ))}
        {filteredCharacters.length === 0 && (
          <p className="text-gray-500 text-sm">
            {search ? 'No characters found' : 'No characters available'}
          </p>
        )}
      </div>
    </section>
  );
};

export default CharactersSection;
