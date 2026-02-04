import { useState } from 'react';
import { useSceneStore } from '../../store/sceneStore';
import SearchBar from './SearchBar';

const BackgroundSection = ({ onUpdate }) => {
  const { assets, background, setBackground } = useSceneStore();
  const [search, setSearch] = useState('');

  const handleSelect = (bg) => {
    setBackground(bg.path);
    onUpdate({ background: bg.path });
  };

  const filteredBackgrounds = assets.backgrounds.filter(bg =>
    bg.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-100">Backgrounds</h2>
      <SearchBar value={search} onChange={setSearch} placeholder="Search backgrounds..." />
      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
        {filteredBackgrounds.map((bg) => (
          <button
            key={bg.path}
            onClick={() => handleSelect(bg)}
            className={`relative aspect-video rounded overflow-hidden border-2 transition-all ${
              background === bg.path ? 'border-blue-500' : 'border-transparent hover:border-gray-600'
            }`}
          >
            <img
              src={bg.path}
              alt={bg.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs text-white p-1 truncate">
              {bg.name}
            </span>
          </button>
        ))}
        {filteredBackgrounds.length === 0 && (
          <p className="text-gray-500 text-sm col-span-3">
            {search ? 'No backgrounds found' : 'No backgrounds available'}
          </p>
        )}
      </div>
    </section>
  );
};

export default BackgroundSection;
