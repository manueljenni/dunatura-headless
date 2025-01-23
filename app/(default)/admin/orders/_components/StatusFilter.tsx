import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const statuses = [
  { value: "all", label: "All Orders" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "unfulfilled", label: "Unfulfilled" },
  { value: "in_progress", label: "In Progress" },
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
