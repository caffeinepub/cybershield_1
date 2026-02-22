import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

export default function TimeRangeSelector({ timeRange, setTimeRange }: TimeRangeSelectorProps) {
  return (
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="24h">24 Hours</SelectItem>
        <SelectItem value="7d">7 Days</SelectItem>
        <SelectItem value="30d">30 Days</SelectItem>
        <SelectItem value="all">All Time</SelectItem>
      </SelectContent>
    </Select>
  );
}
