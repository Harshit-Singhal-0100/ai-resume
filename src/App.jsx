// src/App.js

import React from 'react';
import './App.css'; // import the main stylesheet
import ResumeBuilder from './Components/ResumeBuilder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Resume Builder</h1>
      </header>
      <main>
        <ResumeBuilder />
      </main>
    </div>
  );
}

export default App;
