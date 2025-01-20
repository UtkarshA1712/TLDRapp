import React from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeToggle = ({ theme, onThemeChange }) => {
  const themes = [
    { id: 'light', icon: FiSun, label: 'Light' },
    { id: 'dark', icon: FiMoon, label: 'Dark' },
    { id: 'system', icon: FiMonitor, label: 'System' },
  ];

  return (
    <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onThemeChange(id)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded
            ${theme === id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          <Icon className="h-4 w-4" />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;