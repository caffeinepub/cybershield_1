import { useState, useEffect } from 'react';
import AlertNotification from './AlertNotification';

// Mock alerts for demonstration
interface Alert {
  id: number;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: number;
}

export default function AlertManager() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulate receiving alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert: Alert = {
          id: Date.now(),
          message: getRandomAlertMessage(),
          severity: getRandomSeverity(),
          timestamp: Date.now(),
        };
        setAlerts((prev) => [...prev, newAlert].slice(-3)); // Keep only last 3
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="fixed right-6 top-20 z-50 flex flex-col gap-3">
      {alerts.map((alert) => (
        <AlertNotification
          key={alert.id}
          alert={alert}
          onDismiss={() => handleDismiss(alert.id)}
        />
      ))}
    </div>
  );
}

function getRandomAlertMessage() {
  const messages = [
    'Suspicious login attempt detected',
    'Unusual network traffic pattern identified',
    'Potential malware signature detected',
    'Failed authentication attempts exceeded threshold',
    'DDoS attack pattern detected',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomSeverity(): 'critical' | 'high' | 'medium' | 'low' {
  const severities: ('critical' | 'high' | 'medium' | 'low')[] = ['critical', 'high', 'medium', 'low'];
  return severities[Math.floor(Math.random() * severities.length)];
}
