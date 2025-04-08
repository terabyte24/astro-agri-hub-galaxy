
import { Check, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface DetectionResult {
  diseaseName: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  treatment: string;
}

interface DetectionResultsProps {
  result: DetectionResult | null;
  onNewScan: () => void;
}

const DetectionResults = ({ result, onNewScan }: DetectionResultsProps) => {
  if (!result) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-500 bg-green-500/10";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10";
      case "high":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-blue-500 bg-blue-500/10";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <Check className="w-5 h-5" />;
      case "medium":
        return <Info className="w-5 h-5" />;
      case "high":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card className="cosmic-card overflow-hidden">
        <CardHeader className="bg-primary/10 border-b border-border/50">
          <CardTitle className="flex items-center justify-between">
            <span>{result.diseaseName}</span>
            <div className="text-sm font-normal py-1 px-3 rounded-full bg-primary/20">
              {(result.confidence * 100).toFixed(1)}% Confidence
            </div>
          </CardTitle>
          <CardDescription>
            Disease detection results
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${getSeverityColor(result.severity)}`}>
              {getSeverityIcon(result.severity)}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Severity</p>
              <p className="font-medium">{result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Description</h4>
            <p className="text-muted-foreground text-sm">{result.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Treatment</h4>
            <p className="text-muted-foreground text-sm">{result.treatment}</p>
          </div>
          
          <Button onClick={onNewScan} className="w-full mt-4">
            Scan New Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetectionResults;
