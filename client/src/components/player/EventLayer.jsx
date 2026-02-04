import { useSceneStore } from '../../store/sceneStore';

const EventLayer = () => {
  const { event } = useSceneStore();

  if (!event) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
      <img
        src={event}
        alt="Event"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default EventLayer;
