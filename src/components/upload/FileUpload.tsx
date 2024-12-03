import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileWarning } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    if (!file.name.endsWith('.csv')) {
      toast.error('Only CSV files are supported');
      return;
    }
    
    onFileSelect(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        {isDragActive ? (
          <>
            <Upload className="h-12 w-12 text-indigo-500" />
            <p className="text-indigo-500 font-medium">Drop your CSV file here</p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400" />
            <div>
              <p className="text-gray-600 font-medium">
                Drag & drop your CSV file here, or click to select
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Only CSV files up to 5MB are supported
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}