import './App.sass';
import Menu from './components/Menu';
import RulesView from "./containers/RulesView";
import GameView from "./containers/GameView";
import ResultsView from "./containers/ResultsView";
import WarningView from './containers/WarningView';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Toast from './components/Toast';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Toast />
      <Menu />
      <WarningView />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<RulesView />}/>
          <Route path="/game" element={<GameView/>}/>
          <Route path="/results" element={<ResultsView />}/>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
