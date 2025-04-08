
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

interface Message {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
}

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm AstroBot, your agricultural assistant. How can I help with your farming questions today?",
      role: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock response - in a real app, this would be an API call
      const botResponses = [
        "Based on your description, it sounds like your crop might be suffering from leaf blight. I recommend applying a copper-based fungicide and ensuring proper drainage in your field.",
        "Your soil fertility concerns are valid. Consider crop rotation with legumes to naturally enhance nitrogen levels, and a soil test would help determine specific nutrient deficiencies.",
        "The irregular watering pattern could be causing your yield issues. Try implementing a consistent irrigation schedule, preferably in the early morning to reduce evaporation.",
        "Weather forecasts for your region indicate rainfall in the coming days. This would be an optimal time for planting your seasonal crops.",
        "The pest you're describing sounds like aphids. Consider introducing natural predators like ladybugs or using neem oil as an organic pesticide solution."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        role: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="cosmic-card h-[600px] max-h-[80vh] flex flex-col">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          AstroBot
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={message.role === "bot" ? "bg-primary/20" : "bg-secondary"}>
                  <AvatarFallback>
                    {message.role === "bot" ? "🤖" : "👤"}
                  </AvatarFallback>
                  {message.role === "bot" && (
                    <AvatarImage src="/astrobot-avatar.png" />
                  )}
                </Avatar>
                
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border/50"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="bg-primary/20">
                  <AvatarFallback>🤖</AvatarFallback>
                  <AvatarImage src="/astrobot-avatar.png" />
                </Avatar>
                
                <div>
                  <div className="rounded-lg p-3 bg-card border border-border/50">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-border/50 mt-auto">
          <div className="flex gap-2">
            <Input
              placeholder={t("askQuestion")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotInterface;
