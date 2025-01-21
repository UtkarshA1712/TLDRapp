import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';

const Summary = ({ summary, highlightKeyPoints = true }) => {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary.replace(/\*\*/g, '').replace(/^\* /gm, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const parseMarkdown = (text) => {
    // Parse bold text (text between ** **)
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={index} className="font-semibold">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  const renderSummary = () => {
    const lines = summary.split('\n').filter(line => line.trim());
    
    return (
      <div className="space-y-4">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('*')) {
            // Handle bullet point lines
            const content = trimmedLine.slice(1).trim();
            return (
              <div key={index} className="flex gap-3">
                <span className="text-gray-400 flex-shrink-0">•</span>
                <div className="flex-1">{parseMarkdown(content)}</div>
              </div>
            );
          } else {
            // Handle regular lines
            return (
              <div key={index} className="text-gray-700">
                {parseMarkdown(trimmedLine)}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="mt-6 border rounded-lg shadow-sm">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">Summary</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Copy to clipboard"
          >
            <Copy className="h-5 w-5" />
          </button>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="p-4 border-t bg-gray-50">
          <div className="max-h-96 overflow-y-auto pr-2">
            {renderSummary()}
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
