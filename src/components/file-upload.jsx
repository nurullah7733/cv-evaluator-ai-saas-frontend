"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";

export default function FileUpload({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-card-foreground mb-2 text-gray-600">
        Upload PDF Resume
      </label>

      {!selectedFile ? (
        <div
          className={`relative border-primary border-2 border-dashed rounded-lg p-2 text-center transition-colors ${
            dragActive
              ? "border-primary bg-card/50"
              : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <Upload className="text-primary mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg  font-medium text-foreground text-gray-700 mb-2">
            Drop your PDF here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground text-gray-600">
            Supports PDF files up to 10MB
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-gray-600" />
            <div>
              <p className="font-medium text-gray-700 text-card-foreground">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-600 text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="cursor-pointer p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
}
