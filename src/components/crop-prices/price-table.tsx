
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

export interface CropPrice {
  id: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  msp: number;
  trend: "up" | "down" | "stable";
}

interface PriceTableProps {
  prices: CropPrice[];
}

const PriceTable = ({ prices }: PriceTableProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crop</TableHead>
            <TableHead className="text-right">Current Price (₹/quintal)</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">MSP (₹/quintal)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prices.map((crop) => {
            const percentChange = getPercentageChange(crop.currentPrice, crop.previousPrice);
            const isPositive = crop.trend === "up";
            const isNegative = crop.trend === "down";
            
            return (
              <TableRow key={crop.id}>
                <TableCell className="font-medium">{crop.name}</TableCell>
                <TableCell className="text-right">₹{crop.currentPrice.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {getTrendIcon(crop.trend)}
                    <span 
                      className={
                        isPositive ? "text-green-500" : 
                        isNegative ? "text-red-500" : 
                        "text-yellow-500"
                      }
                    >
                      {percentChange}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">₹{crop.msp.toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PriceTable;
