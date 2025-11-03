import FareModelSelector from '../FareModelSelector';
import { useState } from 'react';
import type { FareModel } from '@shared/schema';

export default function FareModelSelectorExample() {
  const [selected, setSelected] = useState<FareModel>("balanced");
  
  return (
    <FareModelSelector 
      selected={selected} 
      onSelect={(model) => {
        setSelected(model);
        console.log('Fare model selected:', model);
      }} 
    />
  );
}
