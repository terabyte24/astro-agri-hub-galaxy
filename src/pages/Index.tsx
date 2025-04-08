
import { useState } from "react";
import { AlertTriangle, ArrowRight, CloudSun, Leaf, MessageSquare, Store, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import UploadArea from "@/components/crop-disease/upload-area";
import DetectionResults, { DetectionResult } from "@/components/crop-disease/detection-results";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { t } = useLanguage();

  // Handle image selection
  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    setResult(null);
    
    // Start processing
    setIsProcessing(true);
    
    // Simulate API processing delay
    setTimeout(() => {
      // Mock result - in a real app, this would come from an API
      const mockResult: DetectionResult = {
        diseaseName: "Late Blight",
        confidence: 0.89,
        severity: "medium",
        description: "Late blight is a disease of potato and tomato plants caused by a fungus-like organism. It spreads rapidly in warm, wet conditions, causing widespread damage to foliage and tubers.",
        treatment: "Apply copper-based fungicides early as a preventive measure. Ensure good drainage and proper spacing between plants. Remove and destroy infected plant parts."
      };
      
      setResult(mockResult);
      setIsProcessing(false);
    }, 3000);
  };

  // Reset to upload new image
  const handleNewScan = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const featureCards = [
    {
      icon: <Leaf className="h-10 w-10 text-space-orbit-cyan" />,
      title: t("cropDiseaseTitle"),
      description: t("cropDiseaseDesc"),
      link: "/",
      linkText: "Detect Now",
      color: "from-green-500/20 to-green-600/5"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-400" />,
      title: t("communityTitle"),
      description: t("communityDesc"),
      link: "/community",
      linkText: "Join Community",
      color: "from-purple-500/20 to-purple-600/5"
    },
    {
      icon: <CloudSun className="h-10 w-10 text-blue-400" />,
      title: t("weatherTitle"),
      description: t("weatherDesc"),
      link: "/weather",
      linkText: "Check Weather",
      color: "from-blue-500/20 to-blue-600/5"
    },
    {
      icon: <Store className="h-10 w-10 text-amber-400" />,
      title: t("findStores"),
      description: "Find nearby stores for seeds, pesticides and equipment",
      link: "/map",
      linkText: "Find Stores",
      color: "from-amber-500/20 to-amber-600/5"
    }
  ];

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
              {t("welcomeMessage")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your cosmic companion for smart farming. Detect crop diseases, check weather, and connect with farmers across the galaxy.
            </p>
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-primary/20 animate-pulse delay-100"></div>
              <div className="absolute inset-4 rounded-full bg-primary/30 animate-pulse delay-200"></div>
              <div className="absolute inset-6 rounded-full bg-primary/40 animate-pulse delay-300"></div>
              <div className="absolute inset-8 rounded-full bg-primary animate-pulse delay-500"></div>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {featureCards.map((card, index) => (
              <Card key={index} className="cosmic-card overflow-hidden border-border/50">
                <CardHeader className={`bg-gradient-to-r ${card.color} p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-card flex items-center justify-center">
                      {card.icon}
                    </div>
                    <div>
                      <CardTitle>{card.title}</CardTitle>
                      <CardDescription className="mt-1">{card.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex justify-end">
                  <Link to={card.link}>
                    <Button>
                      {card.linkText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Disease Detection Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{t("cropDiseaseTitle")}</h2>
              <p className="text-muted-foreground">Upload an image of your crop to detect diseases and get treatment recommendations</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {!result ? (
                <div className="space-y-6">
                  <UploadArea 
                    onImageSelected={handleImageSelected} 
                    isProcessing={isProcessing} 
                  />
                  
                  {selectedImage && isProcessing && (
                    <div className="text-center text-muted-foreground">
                      <p>Analyzing image and detecting diseases...</p>
                    </div>
                  )}
                </div>
              ) : (
                <DetectionResults result={result} onNewScan={handleNewScan} />
              )}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mb-16">
            <Card className="cosmic-card border-border/50 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-2 p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to take your farming to the next level?</h3>
                  <p className="text-muted-foreground mb-6">
                    Get premium features including personalized crop recommendations, soil health analysis, 
                    and expert consultations with our Pro subscription.
                  </p>
                  <Link to="/subscription">
                    <Button size="lg">
                      {t("subscription")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-space-orbit-teal/30 to-space-orbit-cyan/10 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-space-orbit-teal/20 mx-auto flex items-center justify-center animate-float">
                      <div className="w-8 h-8 rounded-full bg-space-orbit-teal animate-pulse"></div>
                    </div>
                    <p className="mt-4 font-medium">Unlock cosmic farming potential</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Alert Banner */}
          <div className="mb-16">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="text-yellow-500 h-5 w-5 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-500">Early Detection is Key</h4>
                <p className="text-muted-foreground text-sm">
                  Catching crop diseases early can save up to 80% of potential crop loss. 
                  Use our detection tool regularly to monitor your crops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Index;
