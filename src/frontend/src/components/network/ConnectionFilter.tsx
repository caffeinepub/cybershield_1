import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ConnectionFilterProps {
  filterType: string;
  setFilterType: (value: string) => void;
  showSuspicious: boolean;
  setShowSuspicious: (value: boolean) => void;
}

export default function ConnectionFilter({
  filterType,
  setFilterType,
  showSuspicious,
  setShowSuspicious,
}: ConnectionFilterProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="protocol-filter" className="text-sm">
          Protocol:
        </Label>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger id="protocol-filter" className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="HTTPS">HTTPS</SelectItem>
            <SelectItem value="HTTP">HTTP</SelectItem>
            <SelectItem value="DNS">DNS</SelectItem>
            <SelectItem value="SSH">SSH</SelectItem>
            <SelectItem value="TCP">TCP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="suspicious-filter"
          checked={showSuspicious}
          onCheckedChange={(checked) => setShowSuspicious(checked as boolean)}
        />
        <Label htmlFor="suspicious-filter" className="text-sm">
          Show only suspicious
        </Label>
      </div>
    </div>
  );
}
