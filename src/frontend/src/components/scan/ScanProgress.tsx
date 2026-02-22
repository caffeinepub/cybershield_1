import { Progress } from '@/components/ui/progress';

interface ScanProgressProps {
  isScanning: boolean;
  progress: number;
}

export default function ScanProgress({ isScanning, progress }: ScanProgressProps) {
  const getPhase = () => {
    if (progress < 25) return 'Initializing scan...';
    if (progress < 50) return 'Scanning network ports...';
    if (progress < 75) return 'Analyzing services...';
    if (progress < 100) return 'Checking vulnerabilities...';
    return 'Scan complete';
  };

  return (
    <div className="space-y-4">
      {isScanning ? (
        <>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-[#00ff41]">{progress}%</div>
            <p className="text-sm text-muted-foreground">{getPhase()}</p>
          </div>
          <Progress value={progress} className="h-2" />
        </>
      ) : (
        <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
          {progress === 100 ? 'Scan completed' : 'Ready to scan'}
        </div>
      )}
    </div>
  );
}
