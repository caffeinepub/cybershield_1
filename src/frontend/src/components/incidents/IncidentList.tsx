import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

const mockIncidents = [
  { id: 1, title: 'Suspicious login attempts', severity: 'high', status: 'investigating', date: '2026-02-20 10:30' },
  { id: 2, title: 'Malware detected on endpoint', severity: 'critical', status: 'open', date: '2026-02-20 09:15' },
  { id: 3, title: 'Unauthorized access attempt', severity: 'medium', status: 'resolved', date: '2026-02-19 16:45' },
];

export default function IncidentList() {
  return (
    <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#00ff41]" />
          Active Incidents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#00ff41]/20 hover:bg-transparent">
              <TableHead>Title</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIncidents.map((incident) => (
              <TableRow key={incident.id} className="border-[#00ff41]/10">
                <TableCell className="font-medium">{incident.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      incident.severity === 'critical' ? 'destructive' : 'outline'
                    }
                  >
                    {incident.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      incident.status === 'resolved'
                        ? 'bg-[#00ff41]/20 text-[#00ff41]'
                        : 'bg-orange-500/20 text-orange-400'
                    }
                  >
                    {incident.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{incident.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
