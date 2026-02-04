import { Routes, Route, Navigate } from 'react-router-dom';
import ControlPanel from './pages/ControlPanel';
import PlayerView from './pages/PlayerView';

function App() {
  return (
    <Routes>
      <Route path="/control" element={<ControlPanel />} />
      <Route path="/player" element={<PlayerView />} />
      <Route path="*" element={<Navigate to="/control" replace />} />
    </Routes>
  );
}

export default App;
