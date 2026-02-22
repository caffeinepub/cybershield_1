import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScanControl from '../components/scan/ScanControl';
import ScanProgress from '../components/scan/ScanProgress';
import ScanResults from '../components/scan/ScanResults';
import ScanHistory from '../components/scan/ScanHistory';
import { ScanSearch } from 'lucide-react';

export default function SecurityScan() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-foreground">
          <ScanSearch className="h-8 w-8 text-[#00ff41]" />
          Security Scan
        </h1>
        <p className="text-sm text-muted-foreground">
          Comprehensive system vulnerability assessment
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Scan Control</CardTitle>
          </CardHeader>
          <CardContent>
            <ScanControl
              isScanning={isScanning}
              setIsScanning={setIsScanning}
              setProgress={setProgress}
              setScanResults={setScanResults}
            />
          </CardContent>
        </Card>

        <Card
          className="relative overflow-hidden border-[#00ff41]/20 bg-card/50 backdrop-blur-xl"
          style={{
            backgroundImage: isScanning ? 'url(/assets/generated/scan-visual.dim_800x600.png)' : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
          }}
        >
          {isScanning && (
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70"></div>
          )}
          <CardHeader className="relative">
            <CardTitle>Scan Progress</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <ScanProgress isScanning={isScanning} progress={progress} />
          </CardContent>
        </Card>
      </div>

      {scanResults && <ScanResults results={scanResults} />}

      <ScanHistory />
    </div>
  );
}
