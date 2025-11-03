import FuelInputs from '../FuelInputs';
import { useState } from 'react';
import type { FuelType, SurchargeType } from '@shared/schema';

export default function FuelInputsExample() {
  const [fuelType, setFuelType] = useState<FuelType>("gasoline");
  const [mpg, setMpg] = useState(25);
  const [gasPrice, setGasPrice] = useState(3.5);
  const [surchargeType, setSurchargeType] = useState<SurchargeType>("flat");
  const [surchargeAmount, setSurchargeAmount] = useState(2.0);

  return (
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
  );
}
