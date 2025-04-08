
import { Cloud, CloudRain, CloudSnow, Droplets, Sun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    condition: string;
    highTemp: number;
    lowTemp: number;
  }[];
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case "rainy":
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      case "snow":
      case "snowy":
        return <CloudSnow className="h-8 w-8 text-sky-200" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <Card className="cosmic-card overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 border-b border-border/50">
        <CardTitle className="flex justify-between items-center">
          <span>{data.location}</span>
          {getConditionIcon(data.condition)}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl font-bold">{data.temperature}°C</div>
          <p className="text-muted-foreground">{data.condition}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-medium">{data.windSpeed} km/h</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">5-Day Forecast</h4>
          {data.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-t border-border/30 last:border-b">
              <span className="font-medium">{day.day}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{day.lowTemp}° / {day.highTemp}°</span>
                {getConditionIcon(day.condition)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
