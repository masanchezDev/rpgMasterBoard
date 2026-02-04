import { useState } from 'react';
import { useSceneStore } from '../../store/sceneStore';
import SearchBar from './SearchBar';

const SoundsSection = ({ onEmitSound }) => {
  const { assets } = useSceneStore();
  const [search, setSearch] = useState('');

  const handlePlay = (sound) => {
    onEmitSound(sound.path);
  };

  const filteredSounds = assets.sounds.filter(sound =>
    sound.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-100">Sound Effects</h2>
      <SearchBar value={search} onChange={setSearch} placeholder="Search sounds..." />
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {filteredSounds.map((sound) => (
          <button
            key={sound.path}
            onClick={() => handlePlay(sound)}
            className="px-3 py-2 rounded text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white truncate"
          >
            {sound.name}
          </button>
        ))}
        {filteredSounds.length === 0 && (
          <p className="text-gray-500 text-sm col-span-2">
            {search ? 'No sounds found' : 'No sounds available'}
          </p>
        )}
      </div>
    </section>
  );
};

export default SoundsSection;
