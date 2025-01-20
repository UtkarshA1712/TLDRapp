import React, { useCallback, useState } from 'react';
import Tesseract from 'tesseract.js';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiTrash2, FiEdit2 } from 'react-icons/fi';

const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValid = file.type.match(/(pdf|image\/.*)/); 
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValid && isValidSize;
    });

    if (validFiles.length !== acceptedFiles.length) {
      setError('Some files were rejected. Please upload only PDF or image files under 10MB.');
    } else {
      setError(null);
    }
    const newFiles = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    
    if (validFiles.length > 0 && onFileUpload) {
      onFileUpload(validFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const renameFile = (id, newName) => {
    setFiles(files.map(file => 
      file.id === id ? { ...file, name: newName } : file
    ));
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your files here or click to upload
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: PDF, Images (PNG, JPG, GIF) up to 10MB
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="border rounded-lg divide-y">
          {files.map(({ id, name, file }) => (
            <div key={id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiFile className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{name}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const newName = prompt('Enter new name:', name);
                    if (newName) renameFile(id, newName);
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeFile(id)}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;