import { useState, useEffect } from 'react';
import { useSceneStore } from '../../store/sceneStore';

const EventLayer = () => {
  const { event } = useSceneStore();
  const [currentEvent, setCurrentEvent] = useState(event);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (event && !currentEvent) {
      setCurrentEvent(event);
      setIsEntering(true);
      setTimeout(() => setIsEntering(false), 50);
    } else if (!event && currentEvent) {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentEvent(null);
        setIsExiting(false);
      }, 300);
    } else if (event !== currentEvent && event) {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentEvent(event);
        setIsExiting(false);
        setIsEntering(true);
        setTimeout(() => setIsEntering(false), 50);
      }, 300);
    }
  }, [event, currentEvent]);

  if (!currentEvent) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
      <img
        src={currentEvent}
        alt="Event"
        className={`w-full h-full object-cover transition-all duration-300 ${
          isExiting ? 'opacity-0 scale-95' : isEntering ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
      />
    </div>
  );
};

export default EventLayer;
