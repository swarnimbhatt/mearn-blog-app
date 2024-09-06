import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import './styles/ThemeSwitcher.css'; 
const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
  
    return (
      <div className="theme-switcher">
        <input
          type="checkbox"
          id="theme-toggle"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <label htmlFor="theme-toggle" className="switch-label">
          <div className={`icon-container ${theme === 'dark' ? 'slide-right' : 'slide-left'}`}>
            <FaSun className="icon sun-icon" />
            <FaMoon className="icon moon-icon" />
          </div>
        </label>
      </div>
    );
  };
  
  export default ThemeSwitcher;