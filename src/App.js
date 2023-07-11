import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import queryString from 'query-string';

function App() {
  const storedDifficulty = localStorage.getItem('initialDifficulty');
  const storedTheme = localStorage.getItem('initialTheme');
  const [initialDifficulty, setInitialDifficulty] = useState(storedDifficulty || 1);
  const [initialTheme, setInitialTheme] = useState(storedTheme || 1);

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const difficulty = urlParams.difficulty;
    const theme = urlParams.theme;

    if (difficulty && theme) {
      setInitialDifficulty(parseInt(difficulty));
      setInitialTheme(parseInt(theme));
      localStorage.setItem('initialDifficulty', difficulty);
      localStorage.setItem('initialTheme', theme);
    }
  }, []);

  return (
    <Router basename="/hide-and-seek">
      <Routes>
        <Route
          path="/"
          element={<Home initialDifficulty={initialDifficulty} initialTheme={initialTheme} />}
        />
        <Route
          path="/play"
          element={<Game initialDifficulty={initialDifficulty} initialTheme={initialTheme} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
