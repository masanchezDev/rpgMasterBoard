import { useMemo, useState, useEffect, useRef } from 'react';
import { useSceneStore } from '../../store/sceneStore';

const ACTIVE_SIZE = 320;
const INACTIVE_SIZE = 224;
const GAP = 12;
const ANIM_DURATION = 500;

const getPositions = (combatants) => {
  const count = combatants.length;
  if (count === 0) return {};
  const totalWidth = ACTIVE_SIZE + (count - 1) * INACTIVE_SIZE + (count - 1) * GAP;
  const startX = -totalWidth / 2;
  const map = {};
  combatants.forEach((char, index) => {
    const offset = index === 0
      ? startX
      : startX + ACTIVE_SIZE + GAP + (index - 1) * (INACTIVE_SIZE + GAP);
    map[char.path] = { offset, index };
  });
  return map;
};

const getTotalWidth = (count) =>
  count <= 0 ? 0 : ACTIVE_SIZE + (count - 1) * INACTIVE_SIZE + (count - 1) * GAP;

const CombatTracker = () => {
  const { combat } = useSceneStore();
  const prevCombatantsRef = useRef([]);
  const [rotatingOut, setRotatingOut] = useState(null);
  const [rotatingIn, setRotatingIn] = useState(null);
  const [renderList, setRenderList] = useState([]);
  const [positions, setPositions] = useState({});
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!combat.active || combat.combatants.length === 0) {
      setRenderList([]);
      setPositions({});
      setRotatingOut(null);
      setRotatingIn(null);
      prevCombatantsRef.current = [];
      isAnimatingRef.current = false;
      return;
    }

    const prev = prevCombatantsRef.current;
    const next = combat.combatants;
    const prevPaths = prev.map(c => c.path);
    const nextPaths = next.map(c => c.path);

    const isRotation = prev.length > 1 &&
      prev.length === next.length &&
      prevPaths[0] === nextPaths[nextPaths.length - 1] &&
      prevPaths.slice(1).every((p, i) => p === nextPaths[i]);

    if (isRotation && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      const rotatedChar = prev[0].path;
      
      setRotatingOut(rotatedChar);
      setRenderList(prev);
      setPositions(getPositions(prev));

      requestAnimationFrame(() => {
        const exitPositions = getPositions(prev);
        const totalW = getTotalWidth(prev.length);
        exitPositions[rotatedChar] = {
          offset: -totalW / 2 - ACTIVE_SIZE - GAP,
          index: -1
        };
        prev.slice(1).forEach((char, i) => {
          const newOffset = i === 0
            ? -totalW / 2
            : -totalW / 2 + ACTIVE_SIZE + GAP + (i - 1) * (INACTIVE_SIZE + GAP);
          exitPositions[char.path] = { offset: newOffset, index: i };
        });
        setPositions(exitPositions);
      });

      setTimeout(() => {
        setRotatingOut(null);
        setRotatingIn(rotatedChar);
        setRenderList(next);

        const enterPositions = getPositions(next);
        const totalW = getTotalWidth(next.length);
        enterPositions[rotatedChar] = {
          offset: totalW / 2 + GAP,
          index: next.length - 1
        };
        setPositions(enterPositions);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPositions(getPositions(next));
            setTimeout(() => {
              setRotatingIn(null);
              isAnimatingRef.current = false;
            }, ANIM_DURATION);
          });
        });
      }, ANIM_DURATION);
    } else if (!isAnimatingRef.current) {
      setRenderList(next);
      setPositions(getPositions(next));
      setRotatingOut(null);
      setRotatingIn(null);
    }

    prevCombatantsRef.current = next;
  }, [combat.combatants, combat.active]);

  if (!combat.active || renderList.length === 0) return null;

  const totalWidth = getTotalWidth(renderList.length);

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
      <div
        className="px-12 py-8 rounded-2xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div
          className="relative"
          style={{
            width: `${totalWidth}px`,
            height: `${ACTIVE_SIZE}px`
          }}
        >
          {renderList.map((char) => {
            const pos = positions[char.path];
            if (!pos) return null;
            const isExiting = rotatingOut === char.path;
            const isEntering = rotatingIn === char.path;
            const isActive = pos.index === 0 && !isExiting;
            const size = isActive ? ACTIVE_SIZE : INACTIVE_SIZE;

            return (
              <div
                key={char.path}
                className="absolute top-1/2"
                style={{
                  left: `${totalWidth / 2 + pos.offset}px`,
                  transform: 'translateY(-50%)',
                  transition: (isExiting || isEntering)
                    ? `left ${ANIM_DURATION}ms ease-in-out, width ${ANIM_DURATION}ms ease-in-out, height ${ANIM_DURATION}ms ease-in-out, opacity ${ANIM_DURATION}ms ease-in-out`
                    : `left ${ANIM_DURATION}ms ease-in-out, width ${ANIM_DURATION}ms ease-in-out, height ${ANIM_DURATION}ms ease-in-out, opacity ${ANIM_DURATION}ms ease-in-out`,
                  width: `${size}px`,
                  height: `${size}px`,
                  zIndex: isActive ? 10 : 5,
                  opacity: isExiting ? 0 : isActive ? 1 : 0.5
                }}
              >
                <div
                  className={`w-full h-full rounded-lg overflow-hidden transition-shadow duration-500 ${
                    isActive
                      ? 'ring-3 ring-amber-400 shadow-lg shadow-amber-500/40'
                      : 'ring-1 ring-gray-600'
                  }`}
                >
                  <img
                    src={char.path}
                    alt={char.name}
                    className="w-full h-full object-contain bg-gray-900/50"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CombatTracker;
