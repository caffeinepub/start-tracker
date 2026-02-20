import { useGetCounts, useClickStart, useClickNoStart, useResetCounts } from './hooks/useQueries';
import { Loader2 } from 'lucide-react';

function App() {
  const { data: counts, isLoading } = useGetCounts();
  const clickStart = useClickStart();
  const clickNoStart = useClickNoStart();
  const resetCounts = useResetCounts();

  const startCount = counts ? Number(counts[0]) : 0;
  const noStartCount = counts ? Number(counts[1]) : 0;
  const totalAttempts = startCount + noStartCount;
  const startPercentage = totalAttempts > 0 ? (startCount / totalAttempts) * 100 : 0;

  const handleStart = () => {
    clickStart.mutate();
  };

  const handleNoStart = () => {
    clickNoStart.mutate();
  };

  const handleReset = () => {
    resetCounts.mutate();
  };

  const isAnyMutating = clickStart.isPending || clickNoStart.isPending || resetCounts.isPending;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Start Tracker</h1>
          <p className="text-muted-foreground mt-1">Track your start attempts with precision</p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-10">
              {/* Stats Display */}
              <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-10">
                <div className="text-center space-y-6">
                  <div>
                    <div className="text-7xl font-bold text-primary tracking-tight">
                      {startPercentage.toFixed(4)}%
                    </div>
                    <div className="text-lg text-muted-foreground mt-2 font-medium">Start Success Rate</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/40">
                    <div className="space-y-1">
                      <div className="text-4xl font-bold text-accent-foreground">{startCount}</div>
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Starts</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-4xl font-bold text-accent-foreground">{noStartCount}</div>
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">No Starts</div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="text-sm text-muted-foreground">
                      Total Attempts: <span className="font-semibold text-foreground">{totalAttempts}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleStart}
                  disabled={isAnyMutating}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-8 py-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  {clickStart.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Start'
                  )}
                </button>

                <button
                  onClick={handleNoStart}
                  disabled={isAnyMutating}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-8 py-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  {clickNoStart.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'No Start'
                  )}
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  disabled={isAnyMutating}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-10 py-4 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  {resetCounts.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Resetting...
                    </span>
                  ) : (
                    'Reset All Counts'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm py-6 mt-auto">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'start-tracker'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
