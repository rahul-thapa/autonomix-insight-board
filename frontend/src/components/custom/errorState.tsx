import { X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function ErrorState() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
        <X className="h-8 w-8 text-red-500" />

        <p className="text-sm text-muted-foreground">An error occurred while processing your transcript.</p>
        <Link to="/" className="text-sm text-primary">
          <Button variant="default" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
