import { useSceneStore } from '../../store/sceneStore';

const CombatSection = ({ onUpdate }) => {
  const {
    combat, startCombat, endCombat, nextTurn, previousTurn,
    removeFromCombat, reorderCombatants
  } = useSceneStore();

  const handleStart = () => {
    startCombat();
    const state = useSceneStore.getState();
    onUpdate({ combat: { ...state.combat, active: true, turn: 0 } });
  };

  const handleEnd = () => {
    endCombat();
    onUpdate({ combat: { active: false, combatants: [], turn: 0 } });
  };

  const handleNextTurn = () => {
    nextTurn();
    const state = useSceneStore.getState();
    onUpdate({ combat: state.combat });
  };

  const handlePreviousTurn = () => {
    previousTurn();
    const state = useSceneStore.getState();
    onUpdate({ combat: state.combat });
  };

  const handleRemove = (path) => {
    removeFromCombat(path);
    const state = useSceneStore.getState();
    onUpdate({ combat: state.combat });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...combat.combatants];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    reorderCombatants(newOrder);
    onUpdate({ combat: { ...combat, combatants: newOrder } });
  };

  const handleMoveDown = (index) => {
    if (index >= combat.combatants.length - 1) return;
    const newOrder = [...combat.combatants];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    reorderCombatants(newOrder);
    onUpdate({ combat: { ...combat, combatants: newOrder } });
  };

  return (
    <section className="bg-gray-800 rounded-lg p-4 border border-amber-600/30">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-100">⚔️ Combat</h2>
        {combat.active && (
          <span className="text-sm text-amber-400 font-medium">
            Turn {combat.turn + 1}
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {!combat.active ? (
          <button
            onClick={handleStart}
            disabled={combat.combatants.length === 0}
            className={`flex-1 px-4 py-2 rounded font-medium transition-colors ${
              combat.combatants.length === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Start Combat
          </button>
        ) : (
          <>
            <button
              onClick={handlePreviousTurn}
              className="px-4 py-2 rounded font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              ← Previous Turn
            </button>
            <button
              onClick={handleNextTurn}
              className="flex-1 px-4 py-2 rounded font-medium bg-amber-600 hover:bg-amber-700 text-white"
            >
              Next Turn →
            </button>
            <button
              onClick={handleEnd}
              className="px-4 py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white"
            >
              End Combat
            </button>
          </>
        )}
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {combat.combatants.map((char, index) => (
          <div
            key={char.path}
            className={`flex items-center gap-3 p-2 rounded transition-colors ${
              combat.active && index === 0
                ? 'bg-amber-900/50 border border-amber-500'
                : 'bg-gray-700'
            }`}
          >
            <span className="text-xs text-gray-400 w-5 text-center font-mono">
              {index + 1}
            </span>
            <img
              src={char.path}
              alt={char.name}
              className={`object-contain rounded ${
                combat.active && index === 0 ? 'w-14 h-14' : 'w-10 h-10'
              }`}
            />
            <span className={`flex-1 text-sm truncate ${
              combat.active && index === 0 ? 'text-amber-200 font-semibold' : 'text-gray-200'
            }`}>
              {char.name}
              {combat.active && index === 0 && (
                <span className="ml-2 text-xs text-amber-400">● Active</span>
              )}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="px-1.5 py-0.5 rounded text-xs bg-gray-600 hover:bg-gray-500 text-gray-300 disabled:opacity-30 disabled:cursor-default"
              >
                ▲
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index >= combat.combatants.length - 1}
                className="px-1.5 py-0.5 rounded text-xs bg-gray-600 hover:bg-gray-500 text-gray-300 disabled:opacity-30 disabled:cursor-default"
              >
                ▼
              </button>
            </div>
            <button
              onClick={() => handleRemove(char.path)}
              className="px-2 py-1 rounded text-xs bg-red-700 hover:bg-red-800 text-white"
              title="Remove from combat"
            >
              ✕
            </button>
          </div>
        ))}
        {combat.combatants.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            Add characters using the ⚔️ button
          </p>
        )}
      </div>
    </section>
  );
};

export default CombatSection;
