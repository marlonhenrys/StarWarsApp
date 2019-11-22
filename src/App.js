import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CardList from './components/CardList';
import api from './services/api';

import './styles.css';


const App = () => {

  const [darkModeActived, setDarkModeActived] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (darkModeActived) {
      root.style.setProperty('--color-bg-main', '#000');
      root.style.setProperty('--color-bg-items', '#444');
      root.style.setProperty('--color-font-standard', '#FFF');
      root.style.setProperty('--color-font-feature', 'rgb(231, 212, 28)');
    } else {
      root.style.setProperty('--color-bg-main', '#CCC');
      root.style.setProperty('--color-bg-items', '#FFF');
      root.style.setProperty('--color-font-standard', '#000');
      root.style.setProperty('--color-font-feature', 'rgb(88, 90, 155)');
    }
  }, [darkModeActived])

  return (
    <div className="App">
      <h1>Star Wars</h1>
      <Header
        darkModeActived={darkModeActived}
        changeTheme={() => setDarkModeActived(!darkModeActived)}
      />
      <CardList />
    </div>
  );
}


export default App;
