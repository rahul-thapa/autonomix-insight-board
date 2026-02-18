import { Loader2 } from "lucide-react";

export function ProcessingState() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />

        <p className="text-sm text-muted-foreground">Your transcript is being processed...</p>
      </div>
    </div>
  );
}
