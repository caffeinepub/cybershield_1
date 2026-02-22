import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAddIncident } from '../../hooks/useQueries';
import { Severity } from '../../backend';
import { toast } from 'sonner';

interface IncidentFormProps {
  onSuccess: () => void;
}

export default function IncidentForm({ onSuccess }: IncidentFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<string>('medium');
  const addIncident = useAddIncident();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const severityMap: Record<string, Severity> = {
      low: Severity.low,
      medium: Severity.medium,
      high: Severity.high,
      critical: Severity.critical,
    };

    addIncident.mutate(
      {
        description: `${title}: ${description}`,
        severity: severityMap[severity],
      },
      {
        onSuccess: () => {
          toast.success('Incident created successfully');
          setTitle('');
          setDescription('');
          setSeverity('medium');
          onSuccess();
        },
        onError: () => {
          toast.error('Failed to create incident');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Incident Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of the incident"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the incident"
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="severity">Severity</Label>
        <Select value={severity} onValueChange={setSeverity}>
          <SelectTrigger id="severity">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="neon-button" disabled={addIncident.isPending}>
          {addIncident.isPending ? 'Creating...' : 'Create Incident'}
        </Button>
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
