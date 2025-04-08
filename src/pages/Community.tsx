
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import CreatePost from "@/components/community/create-post";
import PostCard, { Post } from "@/components/community/post-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

// Mock data for community posts
const mockPosts: Post[] = [
  {
    id: "post1",
    author: {
      name: "Rajesh Kumar",
      location: "Uttar Pradesh",
    },
    content: "I've noticed some unusual spots on my wheat crop leaves. Has anyone else experienced this issue? What could be causing this and how can I treat it?",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    likes: 24,
    comments: 8,
    date: "2 days ago"
  },
  {
    id: "post2",
    author: {
      name: "Anita Patel",
      location: "Gujarat",
    },
    content: "Our rice harvest this season was better than expected despite the unusual rainfall patterns. I attribute this success to the new drought-resistant variety we tried. Would highly recommend to fellow farmers in regions with unpredictable weather!",
    likes: 56,
    comments: 12,
    date: "1 week ago"
  },
  {
    id: "post3",
    author: {
      name: "Mohammad Rahman",
      location: "West Bengal",
    },
    content: "Does anyone have suggestions for effective organic pest control methods for vegetable gardens? I'm trying to avoid chemical pesticides this season.",
    likes: 18,
    comments: 15,
    date: "3 days ago"
  },
  {
    id: "post4",
    author: {
      name: "Lakshmi Venkatesh",
      location: "Tamil Nadu",
    },
    content: "Sharing my experience with vermicomposting. It's been 6 months since I started, and the difference in soil quality is remarkable. Happy to guide anyone interested in setting up their own system.",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    likes: 42,
    comments: 7,
    date: "5 days ago"
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Handle creating a new post
  const handleNewPost = (content: string, imageUrl?: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: "You",
        location: "Your Location",
      },
      content,
      imageUrl,
      likes: 0,
      comments: 0,
      date: "Just now"
    };
    
    setPosts([newPost, ...posts]);
  };

  // Simulate loading more posts
  const loadMorePosts = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Duplicate existing posts with new IDs for demonstration
      const morePosts = posts.slice(0, 2).map(post => ({
        ...post,
        id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: "3 weeks ago"
      }));
      
      setPosts([...posts, ...morePosts]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t("communityTitle")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow farmers, share experiences, ask questions, and learn from each other
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CreatePost onPost={handleNewPost} />
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="experiences">Experiences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-4">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </TabsContent>
                
                <TabsContent value="questions" className="space-y-4 mt-4">
                  {posts
                    .filter(post => post.content.includes("?"))
                    .map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                </TabsContent>
                
                <TabsContent value="experiences" className="space-y-4 mt-4">
                  {posts
                    .filter(post => !post.content.includes("?"))
                    .map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-center my-8">
                <Button 
                  variant="outline" 
                  onClick={loadMorePosts}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More Posts"}
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="cosmic-card p-4 rounded-xl">
                <h3 className="font-bold text-lg mb-3">Community Guidelines</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Be respectful to fellow farmers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Share accurate information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Include relevant details in questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Use appropriate categories for posts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Share your successes and failures</span>
                  </li>
                </ul>
              </div>
              
              <div className="cosmic-card p-4 rounded-xl">
                <h3 className="font-bold text-lg mb-3">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">#PestControl</Button>
                  <Button variant="outline" size="sm">#OrganicFarming</Button>
                  <Button variant="outline" size="sm">#Irrigation</Button>
                  <Button variant="outline" size="sm">#CropDisease</Button>
                  <Button variant="outline" size="sm">#ClimateAdaptation</Button>
                  <Button variant="outline" size="sm">#SoilHealth</Button>
                  <Button variant="outline" size="sm">#Harvesting</Button>
                </div>
              </div>
              
              <div className="cosmic-card p-4 rounded-xl">
                <h3 className="font-bold text-lg mb-3">Top Contributors</h3>
                <div className="space-y-3">
                  {["Rajesh Kumar", "Anita Patel", "Lakshmi Venkatesh", "Mohammad Rahman", "Vikram Singh"].map((name, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">
                          {30 - i * 5} contributions
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Community;
