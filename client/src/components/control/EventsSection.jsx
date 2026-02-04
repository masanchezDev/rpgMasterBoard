import { useState } from 'react';
import { useSceneStore } from '../../store/sceneStore';
import SearchBar from './SearchBar';

const EventsSection = ({ onUpdate }) => {
  const { assets, event, setEvent, clearEvent } = useSceneStore();
  const [search, setSearch] = useState('');

  const handleTrigger = (evt) => {
    setEvent(evt.path);
    onUpdate({ event: evt.path });
  };

  const handleClear = () => {
    clearEvent();
    onUpdate({ event: null });
  };

  const filteredEvents = assets.events.filter(evt =>
    evt.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-100">Events</h2>
      {event && (
        <button
          onClick={handleClear}
          className="w-full mb-3 px-4 py-2 rounded font-medium bg-red-600 hover:bg-red-700 text-white"
        >
          Clear Current Event
        </button>
      )}
      <SearchBar value={search} onChange={setSearch} placeholder="Search events..." />
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {filteredEvents.map((evt) => (
          <button
            key={evt.path}
            onClick={() => handleTrigger(evt)}
            className={`relative aspect-video rounded overflow-hidden border-2 transition-all ${
              event === evt.path ? 'border-yellow-500' : 'border-transparent hover:border-gray-600'
            }`}
          >
            <img
              src={evt.path}
              alt={evt.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs text-white p-1 truncate">
              {evt.name}
            </span>
          </button>
        ))}
        {filteredEvents.length === 0 && (
          <p className="text-gray-500 text-sm col-span-2">
            {search ? 'No events found' : 'No events available'}
          </p>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
