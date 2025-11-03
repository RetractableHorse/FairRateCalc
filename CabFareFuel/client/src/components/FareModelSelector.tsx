import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { FareModel } from "@shared/schema";

interface FareModelOption {
  id: FareModel;
  name: string;
  description: string;
  baseFare: number;
  costPerMile: number;
  costPerMinute: number;
}

const fareModels: FareModelOption[] = [
  {
    id: "budget",
    name: "Budget",
    description: "Affordable rates for cost-conscious riders",
    baseFare: 5.0,
    costPerMile: 1.5,
    costPerMinute: 0.25,
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Standard pricing for everyday trips",
    baseFare: 7.0,
    costPerMile: 2.0,
    costPerMinute: 0.35,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Higher rates for premium service",
    baseFare: 10.0,
    costPerMile: 3.0,
    costPerMinute: 0.5,
  },
];

interface FareModelSelectorProps {
  selected: FareModel;
  onSelect: (model: FareModel) => void;
}

export default function FareModelSelector({ selected, onSelect }: FareModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {fareModels.map((model) => (
        <Card
          key={model.id}
          className={`cursor-pointer transition-all hover-elevate ${
            selected === model.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelect(model.id)}
          data-testid={`card-fare-model-${model.id}`}
        >
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg">{model.name}</CardTitle>
              {selected === model.id && (
                <div className="rounded-full bg-primary p-1" data-testid={`icon-selected-${model.id}`}>
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </div>
            <CardDescription className="text-sm">{model.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Fare:</span>
              <span className="font-mono font-medium">${model.baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Per Mile:</span>
              <span className="font-mono font-medium">${model.costPerMile.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Per Minute:</span>
              <span className="font-mono font-medium">${model.costPerMinute.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { fareModels };
