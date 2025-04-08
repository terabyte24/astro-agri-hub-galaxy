
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 99,
    duration: "month",
    features: [
      "Crop disease detection",
      "Weather forecasts",
      "Access to community forum",
      "Email support"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 249,
    duration: "month",
    features: [
      "Everything in Basic",
      "Priority disease detection",
      "Advanced weather forecasts",
      "Store location finder",
      "Phone support",
      "Market price alerts"
    ],
    recommended: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 499,
    duration: "month",
    features: [
      "Everything in Pro",
      "Personalized crop recommendations",
      "Soil health analysis",
      "Expert consultations",
      "Priority support 24/7",
      "Advanced analytics dashboard"
    ]
  }
];

const SubscriptionPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`cosmic-card relative h-full flex flex-col ${
            plan.recommended 
              ? "border-primary shadow-lg shadow-primary/10" 
              : ""
          }`}
        >
          {plan.recommended && (
            <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 text-xs font-medium rounded-bl-lg rounded-tr-lg">
              Recommended
            </div>
          )}
          
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                <span className="text-muted-foreground ml-1">/{plan.duration}</span>
              </div>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-primary flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button 
              variant={plan.recommended ? "default" : "outline"}
              className="w-full"
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
