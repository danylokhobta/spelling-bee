import { useState } from 'react';
import './App.sass';
import Menu from './components/Menu';
import RulesView from './components/RulesView';
import GameView from './components/GameView';
import ResultsView from './components/ResultsView';
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  const [answersList, setAnswerList] = useState([]);
  return (
    <div className="App">
      <Menu />
      <div className='router'>
        <HashRouter>
        <Routes>
          <Route path="/" element={<RulesView answersList={answersList} />}/>
          <Route path="/game" element={<GameView setAnswerList={setAnswerList}/>}/>
          <Route path="/results" element={<ResultsView answersList={answersList} />}/>
        </Routes>
      </HashRouter>
      </div>
      
    </div>
  );
}

export default App;
