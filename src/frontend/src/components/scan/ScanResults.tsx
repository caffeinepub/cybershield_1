import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ScanResultsProps {
  results: {
    vulnerabilities: number;
    findings: string[];
    severity: string;
  };
}

export default function ScanResults({ results }: ScanResultsProps) {
  return (
    <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {results.vulnerabilities > 0 ? (
            <AlertTriangle className="h-5 w-5 text-orange-400" />
          ) : (
            <CheckCircle className="h-5 w-5 text-[#00ff41]" />
          )}
          Scan Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <div>
            <div className="text-3xl font-bold text-orange-400">
              {results.vulnerabilities}
            </div>
            <p className="text-sm text-muted-foreground">Vulnerabilities Found</p>
          </div>
          <Badge variant="outline" className="text-orange-400">
            {results.severity.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-3">
          {results.findings.map((finding, index) => (
            <div
              key={index}
              className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-orange-400" />
                <p className="text-sm">{finding}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
