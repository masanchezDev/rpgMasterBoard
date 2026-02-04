import { useState } from 'react';
import { useSceneStore } from '../../store/sceneStore';
import SearchBar from './SearchBar';

const MusicSection = ({ onUpdate }) => {
  const { assets, music, playMusic, stopMusic, setMusicVolume } = useSceneStore();
  const [search, setSearch] = useState('');

  const handlePlay = (track) => {
    playMusic(track.path);
    onUpdate({ music: { src: track.path, volume: music.volume, playing: true } });
  };

  const handleStop = () => {
    stopMusic();
    onUpdate({ music: { src: null, volume: music.volume, playing: false } });
  };

  const handleVolumeChange = (volume) => {
    setMusicVolume(volume);
    onUpdate({ music: { ...music, volume } });
  };

  const filteredMusic = assets.music.filter(track =>
    track.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-100">Music</h2>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-sm text-gray-400">Volume:</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={music.volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-gray-400 w-12">{Math.round(music.volume * 100)}%</span>
      </div>
      <SearchBar value={search} onChange={setSearch} placeholder="Search music..." />
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {filteredMusic.map((track) => (
          <div
            key={track.path}
            className="flex items-center gap-3 p-2 rounded bg-gray-700"
          >
            <span className="flex-1 text-sm text-gray-200 truncate">{track.name}</span>
            {music.src === track.path && music.playing ? (
              <button
                onClick={handleStop}
                className="px-3 py-1 rounded text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={() => handlePlay(track)}
                className="px-3 py-1 rounded text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
              >
                Play
              </button>
            )}
          </div>
        ))}
        {filteredMusic.length === 0 && (
          <p className="text-gray-500 text-sm">
            {search ? 'No music found' : 'No music available'}
          </p>
        )}
      </div>
    </section>
  );
};

export default MusicSection;
