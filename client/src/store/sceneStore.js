import { create } from 'zustand';

export const useSceneStore = create((set, get) => ({
  background: null,
  characters: [],
  objects: [],
  event: null,
  blackout: false,
  music: { src: null, volume: 0.5, playing: false },
  sound: null,
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
    return { characters: [...state.characters, { ...character, x: 50, y: 50, scale: 1 }] };
  }),

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
    sound: scene.sound
  }),

  getSceneState: () => {
    const state = get();
    return {
      background: state.background,
      characters: state.characters,
      objects: state.objects,
      event: state.event,
      blackout: state.blackout,
      music: state.music
    };
  }
}));
