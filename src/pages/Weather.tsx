
import { useState, useEffect } from "react";
import { Cloud, Loader2, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import WeatherCard, { WeatherData } from "@/components/weather/weather-card";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

// Mock weather data
const mockWeatherData: WeatherData[] = [
  {
    location: "New Delhi, India",
    temperature: 32,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Today", condition: "Sunny", highTemp: 32, lowTemp: 24 },
      { day: "Tomorrow", condition: "Partly Cloudy", highTemp: 30, lowTemp: 23 },
      { day: "Wednesday", condition: "Rain", highTemp: 28, lowTemp: 22 },
      { day: "Thursday", condition: "Rain", highTemp: 27, lowTemp: 21 },
      { day: "Friday", condition: "Cloudy", highTemp: 29, lowTemp: 22 }
    ]
  },
  {
    location: "Mumbai, India",
    temperature: 29,
    condition: "Cloudy",
    humidity: 78,
    windSpeed: 8,
    forecast: [
      { day: "Today", condition: "Cloudy", highTemp: 29, lowTemp: 25 },
      { day: "Tomorrow", condition: "Rain", highTemp: 28, lowTemp: 24 },
      { day: "Wednesday", condition: "Rain", highTemp: 27, lowTemp: 24 },
      { day: "Thursday", condition: "Cloudy", highTemp: 28, lowTemp: 24 },
      { day: "Friday", condition: "Partly Cloudy", highTemp: 29, lowTemp: 25 }
    ]
  },
  {
    location: "Bengaluru, India",
    temperature: 26,
    condition: "Partly Cloudy",
    humidity: 60,
    windSpeed: 15,
    forecast: [
      { day: "Today", condition: "Partly Cloudy", highTemp: 26, lowTemp: 19 },
      { day: "Tomorrow", condition: "Sunny", highTemp: 27, lowTemp: 18 },
      { day: "Wednesday", condition: "Sunny", highTemp: 28, lowTemp: 18 },
      { day: "Thursday", condition: "Partly Cloudy", highTemp: 27, lowTemp: 19 },
      { day: "Friday", condition: "Cloudy", highTemp: 25, lowTemp: 18 }
    ]
  },
  {
    location: "Kolkata, India",
    temperature: 30,
    condition: "Rain",
    humidity: 85,
    windSpeed: 10,
    forecast: [
      { day: "Today", condition: "Rain", highTemp: 30, lowTemp: 25 },
      { day: "Tomorrow", condition: "Rain", highTemp: 29, lowTemp: 25 },
      { day: "Wednesday", condition: "Cloudy", highTemp: 31, lowTemp: 26 },
      { day: "Thursday", condition: "Partly Cloudy", highTemp: 32, lowTemp: 26 },
      { day: "Friday", condition: "Sunny", highTemp: 33, lowTemp: 27 }
    ]
  }
];

const Weather = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<WeatherData[]>(mockWeatherData.slice(0, 1));
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API search
    setTimeout(() => {
      const foundLocation = mockWeatherData.find(
        data => data.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (foundLocation) {
        // Add to the top if not already present
        if (!locations.some(loc => loc.location === foundLocation.location)) {
          setLocations([foundLocation, ...locations]);
        }
      }
      
      setSearchQuery("");
      setIsLoading(false);
    }, 1500);
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    
    // Simulate geolocation and API call
    setTimeout(() => {
      // Just add another random location from our mock data for demonstration
      const randomIndex = Math.floor(Math.random() * mockWeatherData.length);
      const location = mockWeatherData[randomIndex];
      
      if (!locations.some(loc => loc.location === location.location)) {
        setLocations([location, ...locations]);
      }
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t("weatherTitle")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get accurate weather forecasts for your farming location to plan your activities effectively
            </p>
          </div>
          
          {/* Search Section */}
          <Card className="cosmic-card mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for a location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} disabled={!searchQuery.trim() || isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
                <Button variant="outline" onClick={handleUseCurrentLocation} disabled={isLoading}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Weather Cards */}
          {locations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((data, index) => (
                <WeatherCard key={index} data={data} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Cloud className="mx-auto h-16 w-16 mb-4 text-muted" />
              <h3 className="text-xl font-medium mb-2">No Weather Data</h3>
              <p>Search for a location or use your current location to view weather data</p>
            </div>
          )}
          
          {/* Weather Tips */}
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold">Weather Information for Farmers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cosmic-card">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">Rainfall Patterns</h3>
                  <p className="text-muted-foreground">
                    Understanding rainfall patterns is crucial for planning planting, harvesting, 
                    and irrigation schedules. Heavy rainfall followed by dry spells can lead to 
                    crop stress and increased susceptibility to diseases.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cosmic-card">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">Temperature Impact</h3>
                  <p className="text-muted-foreground">
                    Temperature fluctuations affect crop growth, flowering, and fruit development. 
                    Extreme temperatures can cause heat stress or frost damage, while optimal 
                    temperature ranges promote healthy crop development.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cosmic-card">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">Wind Considerations</h3>
                  <p className="text-muted-foreground">
                    Strong winds can damage crops, increase water loss through evaporation, 
                    and affect pollination. Understanding wind patterns helps in planning 
                    windbreaks and optimizing field layouts for crop protection.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Weather;
