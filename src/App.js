import React from 'react'
import './styles/app.scss'
import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar'
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
        <Toolbar />
        <SettingBar />
        <Canvas />
    </div>
  );
}

export default App;
