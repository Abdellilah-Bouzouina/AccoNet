import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Eye, Trash2, HelpCircle } from 'lucide-react';

export interface DocumentUploadProps {
  label: string;
  labelAR: string;
  description: string;
  required: boolean;
  acceptedTypes: string[]; // e.g. ['pdf', 'jpg', 'png']
  maxSizeMB: number; // e.g. 5
  legalTooltip?: string; // legal reason/basis
  onUpload: (file: File, base64: string) => void;
  onRemove: () => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  labelAR,
  description,
  required,
  acceptedTypes,
  maxSizeMB,
  legalTooltip,
  onUpload,
  onRemove
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string; isImage: boolean; previewUrl?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizeExtensions = acceptedTypes.map(t => t.toLowerCase());

  const handleFileSubmission = (file: File) => {
    setErrorMessage(null);
    
    // 1. Validate File Size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setErrorMessage(`Fichier trop volumineux. Maximum ${maxSizeMB}MB. (الملف كبير جداً. الحد الأقصى ${maxSizeMB} ميغابايت)`);
      return;
    }

    // 2. Validate File Type / Extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!normalizeExtensions.includes(fileExtension)) {
      const allowedText = acceptedTypes.join(', ').toUpperCase();
      setErrorMessage(`Format non accepté. ${allowedText} uniquement. (الصيغة غير مقبولة. يسمح بـ ${allowedText} فقط)`);
      return;
    }

    // 3. Simulate Upload process with progress bar
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 150);

    // Read file as Base64 helper
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setTimeout(() => {
        setIsUploading(false);
        const sizeString = (file.size / 1024 < 1024) 
          ? `${(file.size / 1024).toFixed(1)} KB` 
          : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
        
        const isImg = ['jpg', 'jpeg', 'png'].includes(fileExtension);
        setFileDetails({
          name: file.name,
          size: sizeString,
          isImage: isImg,
          previewUrl: isImg ? base64 : undefined
        });
        
        onUpload(file, base64);
      }, 500); // minor aesthetic buffer
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSubmission(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSubmission(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setFileDetails(null);
    setErrorMessage(null);
    setIsUploading(false);
    setUploadProgress(0);
    onRemove();
  };

  return (
    <div className="flex flex-col text-left rtl:text-right w-full font-sans" id={`uploader_${label.replace(/\s+/g, '_')}`}>
      {/* Label and descriptive header */}
      <div className="flex justify-between items-start mb-2.5">
        <div>
          <span className="block text-xs font-serif font-bold text-slate-800">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
          <span className="block text-[11px] font-medium text-brand-primary/95 mt-0.5">
            {labelAR} {required && <span className="text-red-500">*</span>}
          </span>
          <p className="text-[10px] text-slate-400 mt-1 font-sans">{description}</p>
        </div>

        {legalTooltip && (
          <div className="relative shrink-0">
            <button 
              type="button"
              className="text-brand-primary hover:text-[#1E40AF] p-1 focus:outline-none"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <HelpCircle className="w-4 h-4 cursor-pointer" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-6 z-20 w-56 p-2.5 glass border border-blue-100 text-[10px] text-slate-400 leading-normal shadow-lg">
                <p>{legalTooltip}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Uploading Progress Bar State */}
      {isUploading && (
        <div className="border border-blue-200 bg-white p-5 text-center space-y-3">
          <UploadCloud className="w-6 h-6 text-brand-primary animate-bounce mx-auto" />
          <p className="text-[11px] font-mono text-slate-400">Chargement du fichier en cours... {uploadProgress}%</p>
          <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden">
            <div className="bg-brand-primary h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}

      {/* Success File Loaded State */}
      {!isUploading && fileDetails && (
        <div className="border border-emerald-500/50 bg-emerald-900/20/20 p-4 flex items-center justify-between gap-3 shadow-2xs antialiased">
          <div className="flex items-center gap-3 min-w-0">
            {fileDetails.isImage && fileDetails.previewUrl ? (
              <div className="w-[80px] h-[80px] border border-blue-200 overflow-hidden glass shrink-0 relative flex items-center justify-center">
                <img 
                  referrerPolicy="no-referrer"
                  src={fileDetails.previewUrl} 
                  alt="Aperçu document" 
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <div className="w-[80px] h-[80px] border border-blue-200 glass shrink-0 flex items-center justify-center">
                <FileText className="w-9 h-9 text-brand-primary" />
              </div>
            )}
            
            <div className="min-w-0">
              <p className="text-xs font-mono font-bold text-slate-200 truncate" title={fileDetails.name}>
                {fileDetails.name}
              </p>
              <p className="text-[10px] font-mono text-slate-400 mt-1">{fileDetails.size}</p>
              <div className="flex items-center gap-1.5 mt-2 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[9px] font-mono uppercase tracking-wide font-bold">CHARGÉ / تم التحميل</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-1 px-2.5 text-[10px] font-mono uppercase text-red-600 hover:bg-red-900/20 border border-red-250 cursor-pointer flex items-center gap-1 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Supprimer</span>
          </button>
        </div>
      )}

      {/* Empty Upload Zone and Error state */}
      {!isUploading && !fileDetails && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3.5 min-h-[140px] ${
            errorMessage 
              ? 'border-red-400 bg-red-900/20/10 hover:bg-red-900/20/25' 
              : isDragOver
                ? 'border-brand-primary bg-brand-primary/5'
                : 'border-blue-200 bg-white/30 hover:bg-white/70 hover:border-brand-primary'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept={acceptedTypes.map(type => `.${type}`).join(',')}
          />
          
          <UploadCloud className={`w-8 h-8 ${errorMessage ? 'text-red-500' : 'text-brand-primary/60'}`} />
          
          <div className="space-y-1">
            <p className="text-xs text-slate-300 leading-normal">
              <span className="font-bold underline text-brand-primary">Faites glisser</span> ou <span className="font-bold underline text-brand-primary">cliquez pour charger</span>
            </p>
            <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">
              {normalizeExtensions.join(', ').toUpperCase()} — Max {maxSizeMB}MB
            </p>
          </div>
        </div>
      )}

      {/* Specific error container */}
      {errorMessage && (
        <div className="mt-2 text-[10px] text-red-700 bg-red-900/20/50 border border-red-500/20 px-3 py-2 flex items-start gap-1.5 leading-relaxed">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-500" />
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};
