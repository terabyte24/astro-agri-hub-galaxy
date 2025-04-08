
import { useState } from "react";
import { MessageSquare, ThumbsUp, Share2, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    location: string;
  };
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  date: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="cosmic-card overflow-hidden">
      <CardHeader className="p-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            {post.author.avatar && <AvatarImage src={post.author.avatar} />}
          </Avatar>
          <div>
            <h3 className="font-medium">{post.author.name}</h3>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <span>{post.author.location}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="whitespace-pre-line mb-4">{post.content}</p>
        
        {post.imageUrl && (
          <div className="w-full rounded-lg overflow-hidden mb-2">
            <img 
              src={post.imageUrl} 
              alt="Post attachment" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-2 border-t border-border/50 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-2 ${liked ? 'text-primary' : ''}`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likeCount}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
