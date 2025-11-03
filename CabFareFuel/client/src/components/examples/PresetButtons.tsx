import PresetButtons from '../PresetButtons';

export default function PresetButtonsExample() {
  return (
    <PresetButtons 
      onPresetSelect={(preset) => {
        console.log('Preset selected:', preset.name);
      }} 
    />
  );
}
