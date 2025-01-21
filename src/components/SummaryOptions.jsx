import React, { useState } from 'react';
import NeubrutalismButton from './NeubrutalismButton';
import NeubrutalismToggle from './NeubrutalismToggle'; 
const SummaryOptions = ({ length, onLengthChange, onGenerate, loading }) => {
  const [highlightKeyPoints, setHighlightKeyPoints] = useState(false);

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '~2-3 sentences' },
    { value: 'medium', label: 'Medium', description: '~4-5 sentences' },
    { value: 'long', label: 'Long', description: '~6-8 sentences' },
  ];
  const handleToggle = (toggled) => {
    setHighlightKeyPoints(toggled);  // Set the state when the toggle changes
  };
  return (
    <div className="mt-6 space-y-6 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div>
        <label className="block text-lg font-medium text-gray-800 mb-4">
          Summary Length
        </label>
        <div className="grid grid-cols-3 gap-4">
          {lengthOptions.map(({ value, label, description }) => (
            <label
              key={value}
              className={`relative flex flex-col p-4 rounded-lg cursor-pointer border-2 transition-all duration-200
                ${length === value 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              <input
                type="radio"
                name="length"
                value={value}
                checked={length === value}
                onChange={(e) => onLengthChange(e.target.value)}
                className="sr-only"
              />
              <span className={`text-base font-medium mb-1
                ${length === value ? 'text-red-700' : 'text-gray-700'}`}>
                {label}
              </span>
              <span className={`text-xs
                ${length === value ? 'text-red-600' : 'text-gray-500'}`}>
                {description}
              </span>
              {length === value && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </label>
          ))}
        </div>
      </div>

      
      {/* Highlight Key Points Slider */}
      <div className="mt-4 flex items-center space-x-2">
        {/* Move the slider before the text */}
        <NeubrutalismToggle onToggle={(newState) => setHighlightKeyPoints(newState)} />
        <span className="text-sm text-gray-700">Highlight Key Points</span>
      </div>

      <div className="mt-4 flex justify-center">
        <NeubrutalismButton
          onClick={() => onGenerate(highlightKeyPoints)}
          loading={loading}
        />
      </div>
      
    </div>
  );
};

export default SummaryOptions;