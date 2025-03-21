import { useState } from 'react';
import SvgViewer from './components/SvgViewer';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Ekubo Position SVG Generator</h1>
      <p>Preview SVGs generated from the library</p>
      <SvgViewer />
    </div>
  );
}

export default App;
