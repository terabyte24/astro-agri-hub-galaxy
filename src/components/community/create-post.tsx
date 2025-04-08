
import { useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-context";

interface CreatePostProps {
  onPost: (content: string, imageUrl?: string) => void;
}

const CreatePost = ({ onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      onPost(content, imagePreview || undefined);
      setContent("");
      setImagePreview(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="cosmic-card">
      <CardContent className="p-4">
        <Textarea
          placeholder="Share your farming experience or ask a question..."
          className="min-h-24 border-none focus-visible:ring-0 bg-transparent p-0 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {imagePreview && (
          <div className="mt-3 relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full max-h-60 object-contain rounded-md" 
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 w-8 h-8 rounded-full"
              onClick={() => setImagePreview(null)}
            >
              ✕
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t border-border/50 flex justify-between">
        <div>
          <label htmlFor="post-image" className="cursor-pointer">
            <Button variant="ghost" size="sm" className="gap-2" type="button" asChild>
              <div>
                <ImagePlus className="h-4 w-4" />
                <span>Add Image</span>
              </div>
            </Button>
          </label>
          <input 
            id="post-image" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
          />
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={!content.trim() || isSubmitting}
          size="sm"
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
