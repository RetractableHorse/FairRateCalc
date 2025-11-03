import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FuelType, SurchargeType } from "@shared/schema";

interface FuelInputsProps {
  fuelType: FuelType;
  mpg: number;
  gasPrice: number;
  surchargeType: SurchargeType;
  surchargeAmount: number;
  onFuelTypeChange: (value: FuelType) => void;
  onMpgChange: (value: number) => void;
  onGasPriceChange: (value: number) => void;
  onSurchargeTypeChange: (value: SurchargeType) => void;
  onSurchargeAmountChange: (value: number) => void;
}

export default function FuelInputs({
  fuelType,
  mpg,
  gasPrice,
  surchargeType,
  surchargeAmount,
  onFuelTypeChange,
  onMpgChange,
  onGasPriceChange,
  onSurchargeTypeChange,
  onSurchargeAmountChange,
}: FuelInputsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Fuel Cost Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={fuelType} onValueChange={onFuelTypeChange}>
            <SelectTrigger id="fuelType" data-testid="select-fuel-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="ev">Electric (EV)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mpg">{fuelType === "ev" ? "kWh per Mile" : "MPG"}</Label>
          <Input
            id="mpg"
            type="number"
            step="0.1"
            min="0.1"
            value={mpg}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onMpgChange(val > 0 ? val : 0.1);
            }}
            data-testid="input-mpg"
          />
          <p className="text-xs text-muted-foreground">Must be greater than 0</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gasPrice">{fuelType === "ev" ? "Cost per kWh" : "Gas Price"}</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="gasPrice"
              type="number"
              step="0.01"
              min="0"
              value={gasPrice}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onGasPriceChange(isNaN(val) ? 0 : Math.max(0, val));
              }}
              className="pl-6"
              data-testid="input-gas-price"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Fuel Surcharge</Label>
        <RadioGroup value={surchargeType} onValueChange={onSurchargeTypeChange}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="surcharge-none" data-testid="radio-surcharge-none" />
              <Label htmlFor="surcharge-none" className="font-normal cursor-pointer">No Surcharge</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flat" id="surcharge-flat" data-testid="radio-surcharge-flat" />
              <Label htmlFor="surcharge-flat" className="font-normal cursor-pointer">Flat Amount</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="perMile" id="surcharge-perMile" data-testid="radio-surcharge-per-mile" />
              <Label htmlFor="surcharge-perMile" className="font-normal cursor-pointer">Per Mile</Label>
            </div>
          </div>
        </RadioGroup>

        {surchargeType !== "none" && (
          <div className="space-y-2">
            <Label htmlFor="surchargeAmount">
              {surchargeType === "flat" ? "Flat Surcharge Amount" : "Surcharge per Mile"}
            </Label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="surchargeAmount"
                type="number"
                step="0.01"
                min="0"
                value={surchargeAmount}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onSurchargeAmountChange(isNaN(val) ? 0 : Math.max(0, val));
                }}
                className="pl-6"
                data-testid="input-surcharge-amount"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
