import ReceiptDisplay from '../ReceiptDisplay';

export default function ReceiptDisplayExample() {
  const calculation = {
    baseFare: 7.0,
    distanceCharge: 16.0,
    timeCharge: 7.0,
    fuelSurcharge: 2.0,
    fuelCost: 3.6,
    subtotal: 32.0,
    total: 35.6,
  };

  return (
    <div className="max-w-md">
      <ReceiptDisplay 
        calculation={calculation}
        distance={8.0}
        duration={20}
      />
    </div>
  );
}
