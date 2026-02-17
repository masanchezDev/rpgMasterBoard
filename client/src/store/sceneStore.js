import { create } from 'zustand';

export const useSceneStore = create((set, get) => ({
  background: null,
  characters: [],
  objects: [],
  event: null,
  blackout: false,
  music: { src: null, volume: 0.5, playing: false },
  sound: null,
  combat: { active: false, combatants: [], turn: 0 },
  assets: {
    backgrounds: [],
    characters: [],
    objects: [],
    events: [],
    music: [],
    sounds: []
  },

  setAssets: (assets) => set({ assets }),

  setBackground: (background) => set({ background }),

  toggleCharacter: (character) => set((state) => {
    const exists = state.characters.find(c => c.path === character.path);
    if (exists) {
      return { characters: state.characters.filter(c => c.path !== character.path) };
    }
    return { characters: [...state.characters, { ...character, scale: 0.7 }] };
  }),

  clearAllCharacters: () => set({ characters: [] }),

  updateCharacterPosition: (path, x, y) => set((state) => ({
    characters: state.characters.map(c => 
      c.path === path ? { ...c, x, y } : c
    )
  })),

  updateCharacterScale: (path, scale) => set((state) => ({
    characters: state.characters.map(c => 
      c.path === path ? { ...c, scale } : c
    )
  })),

  addToCombat: (character) => set((state) => {
    const exists = state.combat.combatants.find(c => c.path === character.path);
    if (exists) return state;
    return { combat: { ...state.combat, combatants: [...state.combat.combatants, character] } };
  }),

  removeFromCombat: (path) => set((state) => ({
    combat: {
      ...state.combat,
      combatants: state.combat.combatants.filter(c => c.path !== path)
    }
  })),

  reorderCombatants: (combatants) => set((state) => ({
    combat: { ...state.combat, combatants }
  })),

  startCombat: () => set((state) => ({
    combat: { ...state.combat, active: true, turn: 0 }
  })),

  endCombat: () => set({ combat: { active: false, combatants: [], turn: 0 } }),

  nextTurn: () => set((state) => {
    const { combatants } = state.combat;
    if (combatants.length === 0) return state;
    const rotated = [...combatants.slice(1), combatants[0]];
    return { combat: { ...state.combat, combatants: rotated, turn: state.combat.turn + 1 } };
  }),

  previousTurn: () => set((state) => {
    const { combatants } = state.combat;
    if (combatants.length === 0) return state;
    const rotated = [combatants[combatants.length - 1], ...combatants.slice(0, -1)];
    return { combat: { ...state.combat, combatants: rotated, turn: Math.max(0, state.combat.turn - 1) } };
  }),

  toggleObject: (object) => set((state) => {
    const exists = state.objects.find(o => o.path === object.path);
    if (exists) {
      return { objects: state.objects.filter(o => o.path !== object.path) };
    }
    return { objects: [...state.objects, { ...object, x: 50, y: 50, scale: 1 }] };
  }),

  setEvent: (event) => set({ event }),
  clearEvent: () => set({ event: null }),

  setBlackout: (blackout) => set({ blackout }),
  toggleBlackout: () => set((state) => ({ blackout: !state.blackout })),

  setMusic: (music) => set({ music }),
  setMusicVolume: (volume) => set((state) => ({ 
    music: { ...state.music, volume } 
  })),
  toggleMusic: () => set((state) => ({ 
    music: { ...state.music, playing: !state.music.playing } 
  })),
  stopMusic: () => set((state) => ({ 
    music: { ...state.music, playing: false, src: null } 
  })),
  playMusic: (src) => set((state) => ({ 
    music: { ...state.music, src, playing: true } 
  })),

  playSound: (sound) => set({ sound }),
  clearSound: () => set({ sound: null }),

  syncScene: (scene) => set({
    background: scene.background,
    characters: scene.characters,
    objects: scene.objects,
    event: scene.event,
    blackout: scene.blackout,
    music: scene.music,
    sound: scene.sound,
    combat: scene.combat || { active: false, combatants: [], turn: 0 }
  }),

  getSceneState: () => {
    const state = get();
    return {
      background: state.background,
      characters: state.characters,
      objects: state.objects,
      event: state.event,
      blackout: state.blackout,
      music: state.music,
      combat: state.combat
    };
  }
}));
