import Calculator from '../../pages/Calculator';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function CalculatorExample() {
  return (
    <TooltipProvider>
      <Calculator />
      <Toaster />
    </TooltipProvider>
  );
}
