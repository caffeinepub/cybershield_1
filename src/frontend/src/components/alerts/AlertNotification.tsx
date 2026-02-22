import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AlertNotificationProps {
  alert: {
    id: number;
    message: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    timestamp: number;
  };
  onDismiss: () => void;
}

export default function AlertNotification({ alert, onDismiss }: AlertNotificationProps) {
  const severityColors = {
    critical: 'border-red-500/50 bg-red-500/10 text-red-400',
    high: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
    medium: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
    low: 'border-[#00ff41]/50 bg-[#00ff41]/10 text-[#00ff41]',
  };

  return (
    <div
      className={cn(
        'animate-in slide-in-from-right w-80 rounded-lg border p-4 shadow-lg backdrop-blur-xl',
        severityColors[alert.severity]
      )}
    >
      <div className="flex items-start gap-3">
        <img
          src="/assets/generated/alert-icon.dim_128x128.png"
          alt="Alert"
          className="h-6 w-6"
        />
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase">{alert.severity} Alert</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-transparent"
              onClick={onDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm">{alert.message}</p>
          <p className="mt-2 text-xs opacity-60">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
