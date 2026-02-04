import { useSocket } from '../hooks/useSocket';
import BackgroundSection from '../components/control/BackgroundSection';
import CharactersSection from '../components/control/CharactersSection';
import ObjectsSection from '../components/control/ObjectsSection';
import MusicSection from '../components/control/MusicSection';
import SoundsSection from '../components/control/SoundsSection';
import EventsSection from '../components/control/EventsSection';
import MasterControls from '../components/control/MasterControls';

const ControlPanel = () => {
  const { emitSceneUpdate, emitSound } = useSocket(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100">RPG Master Board</h1>
        <p className="text-gray-400">Game Master Control Panel</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="space-y-6">
          <MasterControls onUpdate={emitSceneUpdate} />
          <BackgroundSection onUpdate={emitSceneUpdate} />
        </div>

        <div className="space-y-6">
          <CharactersSection onUpdate={emitSceneUpdate} />
          <ObjectsSection onUpdate={emitSceneUpdate} />
        </div>

        <div className="space-y-6">
          <MusicSection onUpdate={emitSceneUpdate} />
          <SoundsSection onEmitSound={emitSound} />
          <EventsSection onUpdate={emitSceneUpdate} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
