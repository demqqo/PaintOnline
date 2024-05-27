import React from 'react'
import './styles/app.scss'
import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar'
import Canvas from './components/Canvas';
import {Routes, Route, Navigate,BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/:id" element={
            <>
              <Toolbar />
              <SettingBar />
              <Canvas />
            </>
          } />
          <Route path="*" element={<Navigate to={`/${(+new Date()).toString(16)}`} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
