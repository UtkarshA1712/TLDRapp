import React from 'react';
import { createWorker } from 'tesseract.js';
import { FiRefreshCw } from 'react-icons/fi';

const formatText = (text) => {
    return text.split('\n').map((line, index) => {
      // Check for headings or important parts (for example, capitalized lines)
      if (line.match(/^[A-Z]/)) {
        return (
          <div key={index} className="font-bold text-xl">
            {line}
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

const TextExtraction = ({ text, loading, onRetry }) => {
  return (
    <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h3 className="text-lg font-medium text-gray-800">Extracted Text</h3>
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full transition-colors duration-200"
        >
          <FiRefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button> 
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : text ? (
        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto custom-scrollbar">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formatText(text)}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg border-2 border-dashed">
          <div className="max-w-xs mx-auto space-y-2">
            <p className="font-medium">No text extracted yet</p>
            <p className="text-sm">Upload a document to begin the extraction process</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextExtraction;