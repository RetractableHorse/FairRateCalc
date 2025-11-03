import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FareInputsProps {
  baseFare: number;
  costPerMile: number;
  costPerMinute: number;
  distance: number;
  duration: number;
  onBaseFareChange: (value: number) => void;
  onCostPerMileChange: (value: number) => void;
  onCostPerMinuteChange: (value: number) => void;
  onDistanceChange: (value: number) => void;
  onDurationChange: (value: number) => void;
}

export default function FareInputs({
  baseFare,
  costPerMile,
  costPerMinute,
  distance,
  duration,
  onBaseFareChange,
  onCostPerMileChange,
  onCostPerMinuteChange,
  onDistanceChange,
  onDurationChange,
}: FareInputsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Fare Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="baseFare">Base Fare</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="baseFare"
                type="number"
                step="0.01"
                min="0"
                value={baseFare}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onBaseFareChange(isNaN(val) ? 0 : Math.max(0, val));
                }}
                className="pl-6"
                data-testid="input-base-fare"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="costPerMile">Cost per Mile</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="costPerMile"
                type="number"
                step="0.01"
                min="0"
                value={costPerMile}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onCostPerMileChange(isNaN(val) ? 0 : Math.max(0, val));
                }}
                className="pl-6"
                data-testid="input-cost-per-mile"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="costPerMinute">Cost per Minute</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="costPerMinute"
                type="number"
                step="0.01"
                min="0"
                value={costPerMinute}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onCostPerMinuteChange(isNaN(val) ? 0 : Math.max(0, val));
                }}
                className="pl-6"
                data-testid="input-cost-per-minute"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Trip Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="distance">Distance</Label>
            <div className="relative">
              <Input
                id="distance"
                type="number"
                step="0.1"
                min="0"
                value={distance}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onDistanceChange(isNaN(val) ? 0 : Math.max(0, val));
                }}
                className="pr-12"
                data-testid="input-distance"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">mi</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <div className="relative">
              <Input
                id="duration"
                type="number"
                step="1"
                min="0"
                value={duration}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onDurationChange(isNaN(val) ? 0 : Math.max(0, val));
                }}
                className="pr-12"
                data-testid="input-duration"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
