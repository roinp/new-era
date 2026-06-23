import {
  Layers,
  BrickWall,
  Mountain,
  Wrench,
  Home,
  ThermometerSnowflake,
  Droplets,
  Zap,
  Paintbrush,
  LayoutGrid,
  Grid3x3,
  DoorOpen,
  PanelTop,
  Hammer,
  Drill,
  HardHat,
  Trees,
  Truck,
  Bolt,
  Container,
  Factory,
  Package,
  LucideProps,
} from "lucide-react";

const map: Record<string, React.ComponentType<LucideProps>> = {
  Layers,
  Brick: BrickWall,
  Mountain,
  Wrench,
  Home,
  ThermometerSnowflake,
  Droplets,
  Zap,
  Paintbrush,
  LayoutGrid,
  Grid3x3,
  DoorOpen,
  PanelTop,
  Hammer,
  Drill,
  HardHat,
  Trees,
  Truck,
  Bolt,
  Container,
  Factory,
};

export function CategoryIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = map[name] ?? Package;
  return <Icon {...props} />;
}
