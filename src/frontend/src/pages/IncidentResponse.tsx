import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IncidentList from '../components/incidents/IncidentList';
import IncidentForm from '../components/incidents/IncidentForm';
import { AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IncidentResponse() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-foreground">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            Incident Response
          </h1>
          <p className="text-sm text-muted-foreground">
            Document and track security incidents
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="neon-button">
          <Plus className="mr-2 h-4 w-4" />
          New Incident
        </Button>
      </div>

      {showForm && (
        <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Create Incident Report</CardTitle>
          </CardHeader>
          <CardContent>
            <IncidentForm onSuccess={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <IncidentList />
    </div>
  );
}
