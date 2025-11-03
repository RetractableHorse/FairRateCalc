import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FareCalculation } from "@shared/schema";

interface ReceiptDisplayProps {
  calculation: FareCalculation;
  distance: number;
  duration: number;
}

export default function ReceiptDisplay({ calculation, distance, duration }: ReceiptDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg">Cab Fare Receipt</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm" data-testid="receipt-base-fare">
            <span className="text-muted-foreground">Base Fare:</span>
            <span className="font-mono">${calculation.baseFare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm" data-testid="receipt-distance-charge">
            <span className="text-muted-foreground">Distance ({distance.toFixed(1)} mi):</span>
            <span className="font-mono">${calculation.distanceCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm" data-testid="receipt-time-charge">
            <span className="text-muted-foreground">Time ({duration.toFixed(0)} min):</span>
            <span className="font-mono">${calculation.timeCharge.toFixed(2)}</span>
          </div>
          {calculation.fuelSurcharge > 0 && (
            <div className="flex justify-between text-sm" data-testid="receipt-fuel-surcharge">
              <span className="text-muted-foreground">Fuel Surcharge:</span>
              <span className="font-mono">${calculation.fuelSurcharge.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm" data-testid="receipt-fuel-cost">
            <span className="text-muted-foreground">Fuel Cost:</span>
            <span className="font-mono">${calculation.fuelCost.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-sm font-medium" data-testid="receipt-subtotal">
          <span>Subtotal:</span>
          <span className="font-mono">${calculation.subtotal.toFixed(2)}</span>
        </div>

        <Separator className="border-t-2" />

        <div className="flex justify-between pt-2" data-testid="receipt-total">
          <span className="text-xl font-bold">TOTAL:</span>
          <span className="text-xl font-bold font-mono">${calculation.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
