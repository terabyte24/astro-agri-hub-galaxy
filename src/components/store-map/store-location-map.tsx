
import { useState, useEffect } from "react";
import { Search, MapPin, Store, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MapLocation {
  id: string;
  name: string;
  address: string;
  category: "seeds" | "pesticides" | "equipment" | "fertilizers";
  distance: number; // in km
  lat: number;
  lng: number;
}

// Mock data for stores
const mockStores: MapLocation[] = [
  {
    id: "store1",
    name: "AgriSeeds Center",
    address: "123 Farming Road, Agritown",
    category: "seeds",
    distance: 2.3,
    lat: 28.6139,
    lng: 77.2090
  },
  {
    id: "store2",
    name: "PestAway Solutions",
    address: "456 Green Avenue, Cropsville",
    category: "pesticides",
    distance: 3.7,
    lat: 28.6129,
    lng: 77.2295
  },
  {
    id: "store3",
    name: "FarmEquip Machinery",
    address: "789 Harvest Street, Fieldtown",
    category: "equipment",
    distance: 5.1,
    lat: 28.6219,
    lng: 77.2190
  },
  {
    id: "store4",
    name: "GrowMore Fertilizers",
    address: "101 Plant Lane, Soilville",
    category: "fertilizers",
    distance: 4.2,
    lat: 28.6039,
    lng: 77.2190
  }
];

const StoreLocationMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredStores, setFilteredStores] = useState<MapLocation[]>(mockStores);

  // Filter stores based on search and category
  useEffect(() => {
    let results = mockStores;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        store => 
          store.name.toLowerCase().includes(query) || 
          store.address.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      results = results.filter(store => store.category === selectedCategory);
    }
    
    // Sort by distance
    results.sort((a, b) => a.distance - b.distance);
    
    setFilteredStores(results);
  }, [searchQuery, selectedCategory]);

  // Get icon for store category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "seeds":
        return "🌱";
      case "pesticides":
        return "💦";
      case "equipment":
        return "🚜";
      case "fertilizers":
        return "💊";
      default:
        return "🏪";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="cosmic-card h-[500px] relative overflow-hidden">
          <CardHeader className="absolute top-0 left-0 right-0 z-10 bg-background/70 backdrop-blur-sm">
            <CardTitle>Nearby Agricultural Stores</CardTitle>
            <CardDescription>Find stores for seeds, pesticides, equipment and more</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              {/* This would be replaced with an actual map component */}
              <div className="text-center space-y-2">
                <MapPin size={48} className="mx-auto text-primary/50" />
                <p>Map display would go here</p>
                <p className="text-sm">Using location data to show nearby stores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card className="cosmic-card">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "seeds" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("seeds")}
              >
                Seeds
              </Button>
              <Button
                variant={selectedCategory === "pesticides" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("pesticides")}
              >
                Pesticides
              </Button>
              <Button
                variant={selectedCategory === "equipment" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("equipment")}
              >
                Equipment
              </Button>
              <Button
                variant={selectedCategory === "fertilizers" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("fertilizers")}
              >
                Fertilizers
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <Card key={store.id} className="cosmic-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                      {getCategoryIcon(store.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{store.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{store.address}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Store className="h-3 w-3 mr-1" />
                          <span className="capitalize">{store.category}</span>
                          <span className="mx-1">•</span>
                          <span>{store.distance} km away</span>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Navigation className="h-3 w-3" />
                          <span>Directions</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No stores found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreLocationMap;
