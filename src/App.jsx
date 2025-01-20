import React, { useState, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import FileUpload from './components/FileUpload';
import TextExtraction from './components/TextExtraction';
import SummaryOptions from './components/SummaryOptions';
import Summary from './components/Summary';
import ThemeToggle from './components/ThemeToggle';
import FeedbackModal from './components/FeedbackModal';
import { FiGithub, FiHelpCircle, FiMessageSquare } from 'react-icons/fi';
import './index.css';
GlobalWorkerOptions.workerSrc = '../public/pdf.worker.min.js';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [highlightKeyPoints, setHighlightKeyPoints] = useState(false);
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('theme') || 'system'
  );
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => 
    !localStorage.getItem('onboardingComplete')
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  // Function to extract text from PDF using pdfjs-dist
  const extractTextFromPDF = async (file) => {
    const fileArrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: fileArrayBuffer }).promise;

    let extractedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      extractedText += `\n\n--- Page ${i} ---\n\n${pageText}\n\n`;
    }
    return extractedText;
  };
  

  const handleFileUpload = async (file) => {
    setIsExtracting(true);
    try {
      if (file.type.match(/image\/.*/)) {
        // Perform OCR on image files
        const result = await Tesseract.recognize(file, 'eng');
        setExtractedText(result.data.text);
      } else if (file.type === 'application/pdf') {
        const pdfText = await extractTextFromPDF(file);
        setExtractedText(pdfText);
      } else {
        setExtractedText('Unsupported file type.');
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      setExtractedText('Failed to extract text from the document.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      // Simulate summary generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSummary('**Key point 1** Lorem ipsum dolor sit amet...\n\n**Key point 2** Consectetur adipiscing elit...');
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Document Summarizer</h1>
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <FileUpload onFileUpload={handleFileUpload} />
            <TextExtraction
              text={extractedText}
              loading={isExtracting}
              onRetry={() => handleFileUpload()}
            />
          </div>

          <div>
            <SummaryOptions
              length={summaryLength}
              onLengthChange={setSummaryLength}
              onGenerate={handleGenerateSummary}
              loading={isGenerating}
            />
            
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={highlightKeyPoints}
                  onChange={(e) => setHighlightKeyPoints(e.target.checked)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Highlight Key Points</span>
              </label>
            </div>

            {summary && (
              <Summary
                summary={summary}
                highlightKeyPoints={highlightKeyPoints}
              />
            )}
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/document-summarizer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiMessageSquare className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowOnboarding(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiHelpCircle className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 Document Summarizer. All rights reserved.
            </p>
          </div>
        </footer>

        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;