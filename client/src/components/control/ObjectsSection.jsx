import { useState } from 'react';
import { useSceneStore } from '../../store/sceneStore';
import SearchBar from './SearchBar';

const ObjectsSection = ({ onUpdate }) => {
  const { assets, objects, toggleObject } = useSceneStore();
  const [search, setSearch] = useState('');

  const handleToggle = (object) => {
    toggleObject(object);
    const exists = objects.find(o => o.path === object.path);
    const newObjects = exists
      ? objects.filter(o => o.path !== object.path)
      : [...objects, { ...object, x: 50, y: 50, scale: 1 }];
    onUpdate({ objects: newObjects });
  };

  const isActive = (path) => objects.some(o => o.path === path);

  const filteredObjects = assets.objects.filter(obj =>
    obj.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-100">Objects</h2>
      <SearchBar value={search} onChange={setSearch} placeholder="Search objects..." />
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {filteredObjects.map((obj) => (
          <div
            key={obj.path}
            className="flex items-center gap-3 p-2 rounded bg-gray-700"
          >
            <img
              src={obj.path}
              alt={obj.name}
              className="w-10 h-10 object-contain rounded"
            />
            <span className="flex-1 text-sm text-gray-200 truncate">{obj.name}</span>
            <button
              onClick={() => handleToggle(obj)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                isActive(obj.path)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
              }`}
            >
              {isActive(obj.path) ? 'Visible' : 'Hidden'}
            </button>
          </div>
        ))}
        {filteredObjects.length === 0 && (
          <p className="text-gray-500 text-sm">
            {search ? 'No objects found' : 'No objects available'}
          </p>
        )}
      </div>
    </section>
  );
};

export default ObjectsSection;
