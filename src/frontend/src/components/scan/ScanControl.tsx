import { Button } from '@/components/ui/button';
import { Play, Square } from 'lucide-react';
import { useAddScan } from '../../hooks/useQueries';
import { Severity } from '../../backend';
import { toast } from 'sonner';

interface ScanControlProps {
  isScanning: boolean;
  setIsScanning: (value: boolean) => void;
  setProgress: (value: number | ((prev: number) => number)) => void;
  setScanResults: (value: any) => void;
}

export default function ScanControl({
  isScanning,
  setIsScanning,
  setProgress,
  setScanResults,
}: ScanControlProps) {
  const addScan = useAddScan();

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setScanResults(null);

    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Generate mock results
          const findings = [
            'Outdated SSL certificate detected',
            'Weak password policy on admin account',
            'Unpatched system vulnerability CVE-2024-1234',
          ];
          
          const results = {
            vulnerabilities: findings.length,
            findings,
            severity: 'medium' as const,
          };
          
          setScanResults(results);
          
          // Save to backend
          addScan.mutate(
            { findings, severity: Severity.medium },
            {
              onSuccess: () => {
                toast.success('Scan completed and saved');
              },
            }
          );
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const stopScan = () => {
    setIsScanning(false);
    setProgress(0);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#00ff41]/20 bg-[#00ff41]/5 p-4">
        <h3 className="mb-2 text-sm font-medium">Scan Configuration</h3>
        <p className="text-xs text-muted-foreground">
          Full system scan including network ports, services, and vulnerabilities
        </p>
      </div>

      <Button
        onClick={isScanning ? stopScan : startScan}
        className={isScanning ? 'w-full' : 'neon-button w-full'}
        size="lg"
        disabled={addScan.isPending}
      >
        {isScanning ? (
          <>
            <Square className="mr-2 h-4 w-4" />
            Stop Scan
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Start Security Scan
          </>
        )}
      </Button>
    </div>
  );
}
