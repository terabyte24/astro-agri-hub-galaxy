
import { useState } from "react";
import { Filter, FileDown, Printer, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import PriceTable, { CropPrice } from "@/components/crop-prices/price-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for crop prices
const mockCropPrices: CropPrice[] = [
  {
    id: "rice",
    name: "Rice (Paddy)",
    currentPrice: 2040,
    previousPrice: 1950,
    msp: 2015,
    trend: "up"
  },
  {
    id: "wheat",
    name: "Wheat",
    currentPrice: 2125,
    previousPrice: 2150,
    msp: 2050,
    trend: "down"
  },
  {
    id: "maize",
    name: "Maize",
    currentPrice: 1870,
    previousPrice: 1870,
    msp: 1850,
    trend: "stable"
  },
  {
    id: "cotton",
    name: "Cotton",
    currentPrice: 6400,
    previousPrice: 6200,
    msp: 6000,
    trend: "up"
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    currentPrice: 290,
    previousPrice: 285,
    msp: 285,
    trend: "up"
  },
  {
    id: "soybean",
    name: "Soybean",
    currentPrice: 4300,
    previousPrice: 4500,
    msp: 4000,
    trend: "down"
  },
  {
    id: "pulses",
    name: "Pulses (Toor Dal)",
    currentPrice: 6950,
    previousPrice: 6800,
    msp: 6600,
    trend: "up"
  },
  {
    id: "groundnut",
    name: "Groundnut",
    currentPrice: 5850,
    previousPrice: 5950,
    msp: 5650,
    trend: "down"
  }
];

const Prices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cropCategory, setCropCategory] = useState("all");
  const [priceTab, setPriceTab] = useState("current");
  
  // Filter crops based on search query and category
  const filteredCrops = mockCropPrices.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (cropCategory === "all") return matchesSearch;
    if (cropCategory === "increasing") return matchesSearch && crop.trend === "up";
    if (cropCategory === "decreasing") return matchesSearch && crop.trend === "down";
    if (cropCategory === "stable") return matchesSearch && crop.trend === "stable";
    
    return matchesSearch;
  });

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Crop Prices</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest crop prices and Minimum Support Prices (MSP) from government sources
            </p>
          </div>
          
          <Tabs value={priceTab} onValueChange={setPriceTab} className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="current">Current Market Prices</TabsTrigger>
                <TabsTrigger value="historical">Historical Trends</TabsTrigger>
                <TabsTrigger value="msp">MSP Information</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <TabsContent value="current">
              <Card className="cosmic-card">
                <CardHeader>
                  <CardTitle>Current Market Prices</CardTitle>
                  <CardDescription>
                    Latest crop prices from major agricultural markets across India
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search crops..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select value={cropCategory} onValueChange={setCropCategory}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="increasing">Increasing Prices</SelectItem>
                          <SelectItem value="decreasing">Decreasing Prices</SelectItem>
                          <SelectItem value="stable">Stable Prices</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <PriceTable prices={filteredCrops} />
                  
                  <div className="mt-6 text-sm text-muted-foreground text-right">
                    Last updated: April 8, 2025 | Source: Agricultural Market Data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="historical">
              <Card className="cosmic-card">
                <CardHeader>
                  <CardTitle>Historical Price Trends</CardTitle>
                  <CardDescription>
                    View how crop prices have changed over time to identify seasonal patterns
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <p className="text-xl font-medium">Historical Price Charts</p>
                      <p className="text-muted-foreground">
                        Historical price trend visualizations would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="msp">
              <Card className="cosmic-card">
                <CardHeader>
                  <CardTitle>Minimum Support Price (MSP) Information</CardTitle>
                  <CardDescription>
                    Official MSP rates set by the Government of India for agricultural commodities
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">What is MSP?</h3>
                      <p className="text-muted-foreground">
                        Minimum Support Price (MSP) is the price at which the government purchases crops from farmers, 
                        regardless of market price fluctuations. This ensures farmers receive a minimum guaranteed price 
                        for their produce and protects them from market uncertainties.
                      </p>
                    </div>
                    
                    <PriceTable prices={filteredCrops} />
                    
                    <div className="mt-6 text-sm text-muted-foreground">
                      <p>
                        Note: The Government announces MSP for 23 crops. These include 7 cereals (paddy, wheat, maize, sorghum, 
                        pearl millet, barley and ragi), 5 pulses (gram, tur, moong, urad, lentil), 7 oilseeds 
                        (groundnut, rapeseed-mustard, soyabean, seasmum, sunflower, safflower, nigerseed), 
                        and 4 commercial crops (copra, sugarcane, cotton and raw jute).
                      </p>
                      <p className="mt-2">
                        Source: Ministry of Agriculture & Farmers Welfare, Government of India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
};

export default Prices;
