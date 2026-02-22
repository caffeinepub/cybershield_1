import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface ConnectionListProps {
  filterType: string;
  showSuspicious: boolean;
}

// Mock connection data
const mockConnections = [
  { id: 1, source: '192.168.1.100', destination: '8.8.8.8', port: 443, protocol: 'HTTPS', status: 'active', suspicious: false, rate: '2.3 MB/s' },
  { id: 2, source: '192.168.1.105', destination: '1.1.1.1', port: 53, protocol: 'DNS', status: 'active', suspicious: false, rate: '0.1 MB/s' },
  { id: 3, source: '192.168.1.110', destination: '185.220.101.1', port: 9001, protocol: 'TCP', status: 'active', suspicious: true, rate: '15.2 MB/s' },
  { id: 4, source: '192.168.1.115', destination: '172.217.14.206', port: 443, protocol: 'HTTPS', status: 'active', suspicious: false, rate: '5.7 MB/s' },
  { id: 5, source: '192.168.1.120', destination: '104.16.132.229', port: 80, protocol: 'HTTP', status: 'active', suspicious: false, rate: '1.1 MB/s' },
  { id: 6, source: '192.168.1.125', destination: '45.33.32.156', port: 22, protocol: 'SSH', status: 'active', suspicious: true, rate: '0.5 MB/s' },
];

export default function ConnectionList({ filterType, showSuspicious }: ConnectionListProps) {
  const filteredConnections = mockConnections.filter((conn) => {
    if (showSuspicious && !conn.suspicious) return false;
    if (filterType !== 'all' && conn.protocol !== filterType) return false;
    return true;
  });

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow className="border-[#00ff41]/20 hover:bg-transparent">
            <TableHead>Source</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Port</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredConnections.map((conn) => (
            <TableRow
              key={conn.id}
              className={`border-[#00ff41]/10 ${conn.suspicious ? 'bg-red-500/5' : ''}`}
            >
              <TableCell className="font-mono text-xs">{conn.source}</TableCell>
              <TableCell className="font-mono text-xs">{conn.destination}</TableCell>
              <TableCell>{conn.port}</TableCell>
              <TableCell>
                <Badge variant="outline">{conn.protocol}</Badge>
              </TableCell>
              <TableCell className="text-xs">{conn.rate}</TableCell>
              <TableCell>
                {conn.suspicious ? (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Suspicious
                  </Badge>
                ) : (
                  <Badge className="bg-[#00ff41]/20 text-[#00ff41]">Active</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
