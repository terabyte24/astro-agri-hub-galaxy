
import { useState, useRef } from "react";
import { Cloud, FileImage, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface UploadAreaProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const UploadArea = ({ onImageSelected, isProcessing }: UploadAreaProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      return;
    }
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onImageSelected(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative w-full max-w-md mx-auto aspect-[4/3] rounded-xl border-2 border-dashed transition-all ${
        dragActive ? "border-primary bg-primary/5" : "border-border"
      } ${isProcessing ? "pointer-events-none opacity-50" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      {previewImage ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={previewImage} 
            alt="Crop preview" 
            className="w-full h-full object-contain rounded-lg"
          />
          
          {!isProcessing && (
            <div className="absolute bottom-4 right-4">
              <Button onClick={handleButtonClick} variant="secondary" size="sm">
                <FileImage className="w-4 h-4 mr-2" />
                Change Image
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          {isProcessing ? (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-lg font-medium">Processing image...</p>
            </>
          ) : (
            <>
              <Cloud className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">{t("uploadImage")}</p>
              <p className="text-muted-foreground mb-6">
                Drag & drop image here or click to browse
              </p>
              <Button onClick={handleButtonClick}>
                <FileImage className="w-4 h-4 mr-2" />
                Select Image
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
