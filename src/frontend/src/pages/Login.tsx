import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Zap } from 'lucide-react';

export default function Login() {
  const { login, identity, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#0d1117] to-[#0a0e27]">
      {/* Animated background grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
      }}></div>
      
      {/* Glowing orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#00ff41] opacity-10 blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#00d9ff] opacity-10 blur-[120px] [animation-delay:1s]"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-2xl border border-[#00ff41]/20 bg-card/50 p-8 shadow-[0_0_50px_rgba(0,255,65,0.1)] backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src="/assets/generated/shield-logo.dim_256x256.png"
                alt="CyberShield"
                className="h-24 w-24 drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]"
              />
              <div className="absolute inset-0 animate-ping rounded-full bg-[#00ff41] opacity-20"></div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 bg-gradient-to-r from-[#00ff41] via-[#00d9ff] to-[#00ff41] bg-clip-text text-4xl font-bold text-transparent">
              CyberShield
            </h1>
            <p className="text-sm text-muted-foreground">
              Advanced Security Operations Platform
            </p>
          </div>

          {/* Features */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00ff41]/10">
                <Shield className="h-4 w-4 text-[#00ff41]" />
              </div>
              <span className="text-foreground/80">Real-time threat monitoring</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d9ff]/10">
                <Lock className="h-4 w-4 text-[#00d9ff]" />
              </div>
              <span className="text-foreground/80">Secure identity authentication</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff00ff]/10">
                <Zap className="h-4 w-4 text-[#ff00ff]" />
              </div>
              <span className="text-foreground/80">Instant incident response</span>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="neon-button w-full"
            size="lg"
          >
            {isLoggingIn ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                Authenticating...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Secure Login
              </>
            )}
          </Button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Protected by Internet Identity
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
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
      </div>
    </div>
  );
}
