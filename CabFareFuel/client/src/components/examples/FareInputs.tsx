import FareInputs from '../FareInputs';
import { useState } from 'react';

export default function FareInputsExample() {
  const [baseFare, setBaseFare] = useState(7.0);
  const [costPerMile, setCostPerMile] = useState(2.0);
  const [costPerMinute, setCostPerMinute] = useState(0.35);
  const [distance, setDistance] = useState(8.0);
  const [duration, setDuration] = useState(20);

  return (
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
  );
}
