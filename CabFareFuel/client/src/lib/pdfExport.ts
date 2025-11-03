import { jsPDF } from "jspdf";
import type { FareCalculation } from "@shared/schema";

interface ReceiptData {
  calculation: FareCalculation;
  distance: number;
  duration: number;
  fareModel: string;
  fuelType: string;
  timestamp?: Date;
}

export function generateReceiptPDF(data: ReceiptData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Cab Fare Receipt", pageWidth / 2, yPosition, { align: "center" });
  yPosition += 15;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dateStr = data.timestamp ? data.timestamp.toLocaleString() : new Date().toLocaleString();
  doc.text(dateStr, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 15;

  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.text("Trip Details", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  const lineHeight = 7;

  const addLine = (label: string, value: string) => {
    doc.text(label, margin + 5, yPosition);
    doc.text(value, pageWidth - margin, yPosition, { align: "right" });
    yPosition += lineHeight;
  };

  addLine(`Distance:`, `${data.distance.toFixed(1)} miles`);
  addLine(`Duration:`, `${data.duration.toFixed(0)} minutes`);
  addLine(`Fare Model:`, data.fareModel.charAt(0).toUpperCase() + data.fareModel.slice(1));
  addLine(`Fuel Type:`, data.fuelType.charAt(0).toUpperCase() + data.fuelType.slice(1));
  yPosition += 5;

  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.text("Fare Breakdown", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  addLine("Base Fare:", `$${data.calculation.baseFare.toFixed(2)}`);
  addLine(`Distance Charge (${data.distance.toFixed(1)} mi):`, `$${data.calculation.distanceCharge.toFixed(2)}`);
  addLine(`Time Charge (${data.duration.toFixed(0)} min):`, `$${data.calculation.timeCharge.toFixed(2)}`);
  
  if (data.calculation.fuelSurcharge > 0) {
    addLine("Fuel Surcharge:", `$${data.calculation.fuelSurcharge.toFixed(2)}`);
  }
  
  addLine("Fuel Cost:", `$${data.calculation.fuelCost.toFixed(2)}`);
  yPosition += 3;

  doc.setLineWidth(0.3);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  doc.setFont("helvetica", "bold");
  addLine("Subtotal:", `$${data.calculation.subtotal.toFixed(2)}`);
  yPosition += 3;

  doc.setLineWidth(0.8);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", margin + 5, yPosition);
  doc.text(`$${data.calculation.total.toFixed(2)}`, pageWidth - margin, yPosition, { align: "right" });
  yPosition += 15;

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your business!", pageWidth / 2, yPosition, { align: "center" });
  
  const filename = `cab-fare-receipt-${Date.now()}.pdf`;
  doc.save(filename);
}
