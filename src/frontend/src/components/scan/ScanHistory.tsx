import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';

const mockHistory = [
  { id: 1, date: '2026-02-20 14:30', vulnerabilities: 3, severity: 'medium', status: 'completed' },
  { id: 2, date: '2026-02-19 09:15', vulnerabilities: 1, severity: 'low', status: 'completed' },
  { id: 3, date: '2026-02-18 16:45', vulnerabilities: 5, severity: 'high', status: 'completed' },
];

export default function ScanHistory() {
  return (
    <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-[#00ff41]" />
          Scan History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#00ff41]/20 hover:bg-transparent">
              <TableHead>Date & Time</TableHead>
              <TableHead>Vulnerabilities</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((scan) => (
              <TableRow key={scan.id} className="border-[#00ff41]/10">
                <TableCell className="font-mono text-xs">{scan.date}</TableCell>
                <TableCell>{scan.vulnerabilities}</TableCell>
                <TableCell>
                  <Badge
                    variant={scan.severity === 'high' ? 'destructive' : 'outline'}
                  >
                    {scan.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-[#00ff41]/20 text-[#00ff41]">
                    {scan.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
