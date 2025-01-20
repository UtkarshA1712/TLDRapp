import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiCopy } from 'react-icons/fi';

const Summary = ({ summary, highlightKeyPoints }) => {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="mt-6 border rounded-lg">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">Summary</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiCopy className="h-5 w-5" />
          </button>
          {expanded ? (
            <FiChevronUp className="h-5 w-5" />
          ) : (
            <FiChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="p-4 border-t bg-gray-50">
          <div className="max-h-64 overflow-y-auto">
            {highlightKeyPoints ? (
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: summary.replace(
                    /\*\*(.*?)\*\*/g,
                    '<mark class="bg-yellow-200">$1</mark>'
                  ),
                }}
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
            )}
          </div>
        </div>
      )}

      {copied && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Summary;