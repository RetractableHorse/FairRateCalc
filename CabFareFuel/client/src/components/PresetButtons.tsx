import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface ZonePreset {
  id: string;
  name: string;
  baseFare: number;
  costPerMile: number;
  costPerMinute: number;
  fareModel: "balanced" | "premium" | "budget";
}

const zonePresets: ZonePreset[] = [
  {
    id: "nyc",
    name: "NYC",
    baseFare: 8.0,
    costPerMile: 2.5,
    costPerMinute: 0.5,
    fareModel: "premium",
  },
  {
    id: "westchester",
    name: "Westchester",
    baseFare: 6.0,
    costPerMile: 2.0,
    costPerMinute: 0.35,
    fareModel: "balanced",
  },
  {
    id: "newark",
    name: "Newark",
    baseFare: 5.5,
    costPerMile: 1.8,
    costPerMinute: 0.3,
    fareModel: "balanced",
  },
  {
    id: "longisland",
    name: "Long Island",
    baseFare: 7.0,
    costPerMile: 2.2,
    costPerMinute: 0.4,
    fareModel: "balanced",
  },
];

interface PresetButtonsProps {
  onPresetSelect: (preset: ZonePreset) => void;
}

export default function PresetButtons({ onPresetSelect }: PresetButtonsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Quick Presets</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {zonePresets.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            size="sm"
            className="rounded-full whitespace-nowrap"
            onClick={() => onPresetSelect(preset)}
            data-testid={`button-preset-${preset.id}`}
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { zonePresets };
export type { ZonePreset };
