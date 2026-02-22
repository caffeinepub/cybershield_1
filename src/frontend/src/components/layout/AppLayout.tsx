import { ReactNode } from 'react';
import Navigation from './Navigation';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import AlertManager from '../alerts/AlertManager';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { identity, clear } = useInternetIdentity();

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0d1117] to-[#0a0e27]">
      {/* Background grid */}
      <div className="fixed inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,65,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Sidebar */}
      <Navigation />

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-[#00ff41]/10 bg-card/30 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/shield-logo.dim_256x256.png"
                alt="CyberShield"
                className="h-8 w-8 drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]"
              />
              <h1 className="bg-gradient-to-r from-[#00ff41] to-[#00d9ff] bg-clip-text text-xl font-bold text-transparent">
                CyberShield
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {identity && (
                <div className="flex items-center gap-2 rounded-lg border border-[#00ff41]/20 bg-[#00ff41]/5 px-3 py-1.5">
                  <User className="h-4 w-4 text-[#00ff41]" />
                  <span className="text-xs text-foreground/80">
                    {identity.getPrincipal().toString().slice(0, 8)}...
                  </span>
                </div>
              )}
              <Button
                onClick={clear}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[#00ff41]/10 bg-card/30 px-6 py-4 backdrop-blur-xl">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} CyberShield. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ff41] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      {/* Alert Manager */}
      <AlertManager />
    </div>
  );
}
