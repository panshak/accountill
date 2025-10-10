import React from 'react';
import './App.css';
import Login from './components/Login/Login';

import { useThemeToggle } from '../utils/utils';


function App() {
  const [darkMode, setDarkMode] = useThemeToggle();

  return (
    <div className="App">
      <header className="app-header">
        <h1>Accountill</h1>
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? ' Light Mode' : ' Dark Mode'}
        </button>
      </header>

      <main>
        <Login />
      </main>
    </div>
  );
}

export default App;

gjdf;