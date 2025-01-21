# TLDRapp: Document Summarizer

TLDRapp is a smart document summarization tool that allows users to upload PDF or image files and generate concise summaries. Leveraging modern text extraction and AI-based summarization, TLDRapp is built to simplify document processing and highlight key points effectively.

## 🚀 Features

### 1. **Document Upload**
- Supports PDF and image file uploads.
- Drag-and-drop functionality for easy file selection.

### 2. **Text Extraction**
- **PDF Parsing:** Extracts text from PDFs while preserving formatting.
- **OCR Technology:** Uses Tesseract to extract text from image files (e.g., scanned documents).

### 3. **Summary Generation**
- Automatically generates summaries of varying lengths:
  - **Short:** ~2-3 sentences.
  - **Medium:** ~4-5 sentences.
  - **Long:** ~6-8 sentences.
- Offers an option to highlight key points in the summary using bullet points.

### 4. **User Interface**
- Clean and intuitive interface for uploading files and viewing summaries.
- Mobile-responsive design for seamless usage across devices.

### 5. **Hosting**
- Hosted on Vercel for reliable performance and scalability.
- https://tldr-app-mu.vercel.app/

---

## 🛠️ Technical Overview

### Technologies Used
- **Frontend:** React, TailwindCSS
- **AI/ML Services:** Google Generative AI (Gemini 1.5 Flash Model) for summary generation.
- **OCR:** Tesseract.js for text extraction from images.
- **PDF Parsing:** `pdfjs-dist` for extracting text from PDF files.

### Key Features Implemented
1. **Error Handling:** 
   - Displays user-friendly error messages for unsupported file types or failed extractions.
2. **Loading States:**
   - Provides visual feedback during text extraction and summary generation.
3. **Dynamic Prompts:**
   - Checkbox toggles between paragraph summaries and bullet point key highlights.

---

## 📄 Documentation

### Local Development

#### Prerequisites
1. Node.js (v16 or later).
2. Package Manager (npm or yarn).

#### Steps to Run
1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/tldrapp.git
  cd tldrapp
  ```
   
2. Install dependencies:
  ```bash
  npm install
  ```

3. Add your Google API Key to the .env file:
  ```env
  VITE_GOOGLE_API_KEY=your-google-api-key
  ```

4. Start the application:
  ```bash
  npm run dev
  ```


