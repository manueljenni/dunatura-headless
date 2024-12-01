import { LucideIcon } from "lucide-react";

export default function Icon({ icon: IconComponent, color, size }: { 
  icon: LucideIcon;
  color: string;
  size: number;
}) {
  return <IconComponent color={color} size={size} />;
}