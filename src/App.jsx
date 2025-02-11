import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"
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
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a summarization assistant. Your task is to create a summary of the provided text. Please focus only on the content given in the input text. Do not add any external knowledge, opinions, or details that are not mentioned in the input. The summary should be concise and within the specified word limit.Keep your response strictly to the main ideas and points provided in the text.Avoid any hallucination or fabrication of content.",
});

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

  const handleGenerateSummary = async (highlightKeyPoints) => {
    setIsGenerating(true);
    try {
      const wordLimit = summaryLength === 'short' ? 50 : summaryLength === 'medium' ? 100 : 200;
  
      // Modify the prompt to include "highlight key points" in bullet points if the checkbox is checked
      const prompt = `You are a summarization assistant. Your task is to summarize the following text in approximately ${wordLimit} words. Only summarize the content that is present in the provided text. Do not add, omit, or alter any information. Your summary should strictly reflect the main points and ideas from the input text. Avoid any hallucinations, fabrication of new content, or additional information. Focus solely on what is provided, and ensure the summary remains within the specified word limit.${highlightKeyPoints ? ' Additionally, highlight the key points in bullet points.' : ''}Text:${extractedText.replace(/\n/g, ' ').trim()}`;
  
      // Generate the summary
      const result = await model.generateContent(prompt);
  
      // Set the generated summary
      setSummary(result.response.text());
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
                href="https://github.com/UtkarshA1712/TLDRapp"
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