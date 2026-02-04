import { useSocket } from '../hooks/useSocket';
import BackgroundLayer from '../components/player/BackgroundLayer';
import CharactersLayer from '../components/player/CharactersLayer';
import ObjectsLayer from '../components/player/ObjectsLayer';
import EventLayer from '../components/player/EventLayer';
import BlackoutLayer from '../components/player/BlackoutLayer';
import AudioPlayer from '../components/player/AudioPlayer';

const PlayerView = () => {
  useSocket(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <BackgroundLayer />
      <CharactersLayer />
      <ObjectsLayer />
      <EventLayer />
      <BlackoutLayer />
      <AudioPlayer />
    </div>
  );
};

export default PlayerView;
