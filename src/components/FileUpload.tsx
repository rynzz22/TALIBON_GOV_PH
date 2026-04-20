import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, X, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  label: string;
  accept?: string;
  folder?: string;
  currentValue?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onUploadComplete, 
  label, 
  accept = "*", 
  folder = "uploads",
  currentValue 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setError(null);
    setFileName(file.name);
    setUploadProgress(10); // Start progress
    
    // Check file size (max 5MB for demo)
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Max 5MB allowed.");
      setUploadProgress(null);
      return;
    }

    try {
      const fileNameStr = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `${folder}/${fileNameStr}`;

      setUploadProgress(30);

      const { data, error: uploadError } = await supabase.storage
        .from('public-assets') // Make sure this bucket is created in Supabase Storage with public access
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      setUploadProgress(80);

      const { data: { publicUrl } } = supabase.storage
        .from('public-assets')
        .getPublicUrl(filePath);

      setUploadProgress(100);
      setTimeout(() => {
        onUploadComplete(publicUrl);
        setUploadProgress(null);
      }, 500);

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Please try again.");
      setUploadProgress(null);
    }
  };

  const clearFile = () => {
    onUploadComplete("");
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
        {label}
      </label>
      
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 ${
          isDragging 
            ? 'border-blue-600 bg-blue-50/50' 
            : uploadProgress !== null 
              ? 'border-blue-400 bg-blue-50/10'
              : currentValue 
                ? 'border-green-400 bg-green-50/10'
                : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden" 
        />

        <AnimatePresence mode="wait">
          {uploadProgress !== null ? (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3 w-full max-w-xs"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Loader2 size={32} className="text-blue-600 animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-blue-600">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest text-center truncate w-full px-4">
                UPLOADING: {fileName}
              </p>
            </motion.div>
          ) : currentValue ? (
            <motion.div 
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                FILE SECURED
              </p>
              <div className="flex items-center gap-2 mt-2">
                <a 
                  href={currentValue} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] font-black text-blue-600 hover:underline flex items-center gap-1"
                >
                  <FileText size={12} />
                  VIEW CURRENT FILE
                </a>
                <button 
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="p-1 hover:bg-red-50 text-red-400 rounded-lg transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="instruction"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1">
                  Click or drag to upload
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Supported: {accept === "*" ? "All Files" : accept.toUpperCase()} (Up to 5MB)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-widest"
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
