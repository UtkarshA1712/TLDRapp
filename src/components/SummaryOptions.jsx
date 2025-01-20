import React from 'react';

const SummaryOptions = ({ length, onLengthChange, onGenerate, loading }) => {
  const lengthOptions = [
    { value: 'short', label: 'Short', description: '~2-3 sentences' },
    { value: 'medium', label: 'Medium', description: '~4-5 sentences' },
    { value: 'long', label: 'Long', description: '~6-8 sentences' },
  ];

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
                  ? 'border-blue-500 bg-blue-50' 
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
                ${length === value ? 'text-blue-700' : 'text-gray-700'}`}>
                {label}
              </span>
              <span className={`text-xs
                ${length === value ? 'text-blue-600' : 'text-gray-500'}`}>
                {description}
              </span>
              {length === value && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              )}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200
          ${loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Generating Summary...</span>
          </span>
        ) : (
          'Generate Summary'
        )}
      </button>
    </div>
  );
};

export default SummaryOptions;