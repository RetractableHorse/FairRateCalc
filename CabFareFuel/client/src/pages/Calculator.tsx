import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ThemeToggle from "@/components/ThemeToggle";
import FareModelSelector, { fareModels } from "@/components/FareModelSelector";
import PresetButtons from "@/components/PresetButtons";
import FareInputs from "@/components/FareInputs";
import FuelInputs from "@/components/FuelInputs";
import ReceiptDisplay from "@/components/ReceiptDisplay";
import { generateReceiptPDF } from "@/lib/pdfExport";
import type { FareModel, FuelType, SurchargeType, FareCalculation, Transaction } from "@shared/schema";
import type { ZonePreset } from "@/components/PresetButtons";

export default function Calculator() {
  const { toast } = useToast();
  
  const [fareModel, setFareModel] = useState<FareModel>("balanced");
  const [baseFare, setBaseFare] = useState(7.0);
  const [costPerMile, setCostPerMile] = useState(2.0);
  const [costPerMinute, setCostPerMinute] = useState(0.35);
  const [distance, setDistance] = useState(8.0);
  const [duration, setDuration] = useState(20);
  
  const [fuelType, setFuelType] = useState<FuelType>("gasoline");
  const [mpg, setMpg] = useState(25);
  const [gasPrice, setGasPrice] = useState(3.5);
  const [surchargeType, setSurchargeType] = useState<SurchargeType>("flat");
  const [surchargeAmount, setSurchargeAmount] = useState(2.0);

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("cabFareSettings");
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        setFareModel(settings.fareModel || "balanced");
        setBaseFare(settings.baseFare || 7.0);
        setCostPerMile(settings.costPerMile || 2.0);
        setCostPerMinute(settings.costPerMinute || 0.35);
        setDistance(settings.distance || 8.0);
        setDuration(settings.duration || 20);
        setFuelType(settings.fuelType || "gasoline");
        setMpg(settings.mpg || 25);
        setGasPrice(settings.gasPrice || 3.5);
        setSurchargeType(settings.surchargeType || "flat");
        setSurchargeAmount(settings.surchargeAmount || 2.0);
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    const settings = {
      fareModel,
      baseFare,
      costPerMile,
      costPerMinute,
      distance,
      duration,
      fuelType,
      mpg,
      gasPrice,
      surchargeType,
      surchargeAmount,
    };
    localStorage.setItem("cabFareSettings", JSON.stringify(settings));
  }, [fareModel, baseFare, costPerMile, costPerMinute, distance, duration, fuelType, mpg, gasPrice, surchargeType, surchargeAmount]);

  const handleFareModelSelect = (model: FareModel) => {
    setFareModel(model);
    const selectedModel = fareModels.find((m) => m.id === model);
    if (selectedModel) {
      setBaseFare(selectedModel.baseFare);
      setCostPerMile(selectedModel.costPerMile);
      setCostPerMinute(selectedModel.costPerMinute);
    }
  };

  const handlePresetSelect = (preset: ZonePreset) => {
    setFareModel(preset.fareModel);
    setBaseFare(preset.baseFare);
    setCostPerMile(preset.costPerMile);
    setCostPerMinute(preset.costPerMinute);
    toast({
      title: "Preset Applied",
      description: `${preset.name} zone settings loaded successfully.`,
    });
  };

  const calculateFare = (): FareCalculation => {
    const distanceCharge = distance * costPerMile;
    const timeCharge = duration * costPerMinute;
    
    let fuelCost = 0;
    if (mpg > 0) {
      if (fuelType === "ev") {
        fuelCost = distance * mpg * gasPrice;
      } else {
        fuelCost = (distance / mpg) * gasPrice;
      }
    }
    
    let fuelSurcharge = 0;
    if (surchargeType === "flat") {
      fuelSurcharge = surchargeAmount;
    } else if (surchargeType === "perMile") {
      fuelSurcharge = distance * surchargeAmount;
    }
    
    const subtotal = baseFare + distanceCharge + timeCharge + fuelSurcharge;
    const total = subtotal + fuelCost;
    
    return {
      baseFare,
      distanceCharge,
      timeCharge,
      fuelSurcharge,
      fuelCost,
      subtotal,
      total,
    };
  };

  const calculation = calculateFare();

  const saveTransactionMutation = useMutation<Transaction, Error, any>({
    mutationFn: async (transactionData: any) => {
      const response = await apiRequest("POST", "/api/transactions", transactionData);
      return response.json();
    },
    onSuccess: (data: Transaction) => {
      toast({
        title: "Transaction Saved",
        description: `Transaction #${data.id.slice(0, 8)} saved successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save transaction.",
        variant: "destructive",
      });
    },
  });

  const handleExportPDF = () => {
    const receiptData = {
      calculation,
      distance,
      duration,
      fareModel,
      fuelType,
      timestamp: new Date(),
    };
    
    generateReceiptPDF(receiptData);
    
    const transactionData = {
      baseFare: baseFare.toString(),
      costPerMile: costPerMile.toString(),
      costPerMinute: costPerMinute.toString(),
      distance: distance.toString(),
      duration: duration.toString(),
      fuelType,
      mpg: mpg.toString(),
      gasPrice: gasPrice.toString(),
      fuelSurchargeType: surchargeType === "none" ? null : surchargeType,
      fuelSurchargeAmount: surchargeType === "none" ? null : surchargeAmount.toString(),
      fareModel,
      totalFare: calculation.total.toString(),
      fuelCost: calculation.fuelCost.toString(),
      breakdown: calculation,
    };
    
    saveTransactionMutation.mutate(transactionData);
    
    toast({
      title: "PDF Downloaded",
      description: "Your receipt has been saved as a PDF.",
    });
  };

  const handleEmailReceipt = () => {
    toast({
      title: "Email Receipt",
      description: "Email functionality will be available when Square is configured. Add SQUARE_ACCESS_TOKEN to environment secrets.",
    });
    console.log("Email receipt clicked", calculation);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Cab Fare Calculator Pro</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmailReceipt}
              data-testid="button-email-receipt"
            >
              <FileText className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              data-testid="button-export-pdf"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Fare Model</h2>
                    <FareModelSelector selected={fareModel} onSelect={handleFareModelSelect} />
                  </div>
                  
                  <PresetButtons onPresetSelect={handlePresetSelect} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <FareInputs
                    baseFare={baseFare}
                    costPerMile={costPerMile}
                    costPerMinute={costPerMinute}
                    distance={distance}
                    duration={duration}
                    onBaseFareChange={setBaseFare}
                    onCostPerMileChange={setCostPerMile}
                    onCostPerMinuteChange={setCostPerMinute}
                    onDistanceChange={setDistance}
                    onDurationChange={setDuration}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <FuelInputs
                    fuelType={fuelType}
                    mpg={mpg}
                    gasPrice={gasPrice}
                    surchargeType={surchargeType}
                    surchargeAmount={surchargeAmount}
                    onFuelTypeChange={setFuelType}
                    onMpgChange={setMpg}
                    onGasPriceChange={setGasPrice}
                    onSurchargeTypeChange={setSurchargeType}
                    onSurchargeAmountChange={setSurchargeAmount}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <ReceiptDisplay
                  calculation={calculation}
                  distance={distance}
                  duration={duration}
                />
                
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm font-medium mb-2">Total Fare</div>
                    <div className="text-4xl font-bold font-mono" data-testid="text-total-fare">
                      ${calculation.total.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
