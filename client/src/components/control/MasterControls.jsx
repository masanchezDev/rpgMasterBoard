import { useSceneStore } from '../../store/sceneStore';

const MasterControls = ({ onUpdate }) => {
  const { blackout, toggleBlackout } = useSceneStore();

  const handleBlackout = () => {
    toggleBlackout();
    onUpdate({ blackout: !blackout });
  };

  const openPlayerWindow = () => {
    window.open('/player', 'RPG Player View', 'width=1920,height=1080');
  };

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-100">Master Controls</h2>
      <div className="flex gap-3">
        <button
          onClick={handleBlackout}
          className={`flex-1 px-4 py-3 rounded font-bold text-lg transition-colors ${
            blackout
              ? 'bg-yellow-600 hover:bg-yellow-700 text-black'
              : 'bg-gray-900 hover:bg-black text-white border border-gray-600'
          }`}
        >
          {blackout ? '💡 Lights ON' : '🌑 BLACKOUT'}
        </button>
        <button
          onClick={openPlayerWindow}
          className="px-4 py-3 rounded font-medium bg-blue-600 hover:bg-blue-700 text-white"
        >
          Open Player View
        </button>
      </div>
    </section>
  );
};

export default MasterControls;
