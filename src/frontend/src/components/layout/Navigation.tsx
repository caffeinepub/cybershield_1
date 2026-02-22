import { Link, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Network,
  ScanSearch,
  Shield,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/network', label: 'Network', icon: Network },
  { to: '/scan', label: 'Security Scan', icon: ScanSearch },
  { to: '/policies', label: 'Policies', icon: Shield },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/incidents', label: 'Incidents', icon: AlertTriangle },
];

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav className="relative w-64 border-r border-[#00ff41]/10 bg-card/30 backdrop-blur-xl">
      <div className="flex h-full flex-col p-4">
        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#00ff41]/10 text-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.2)]'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-lg border border-[#00ff41]/30"></div>
                )}
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 h-8 w-1 rounded-l-full bg-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.5)]"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
