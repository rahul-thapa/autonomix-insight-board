import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTasks } from "@/hooks/tasks";
import { Button } from "@/components/ui/button";
import Graph from "@/components/custom/graph";
import { ProcessingState } from "@/components/custom/processingState";
import { ErrorState } from "@/components/custom/errorState";

export function Tasks() {
  const { loading, error, data } = useTasks();

  useEffect(() => {}, [data]);

  if (loading) return <ProcessingState />;
  if (error || !data) return <ErrorState />;

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="absolute left-4 top-4 z-10 w-40 rounded-lg border bg-white p-3 text-sm shadow">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>Unblocked</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span>Blocked</span>
          </div>

          <div className="h-px bg-border" />

          <Button variant="ghost" size="sm" asChild className="h-7 justify-start px-1">
            <Link to="/">
              <ArrowLeft className="mr-2 h-3 w-3" />
              Go back
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <Graph tasks={data.result?.tasks || []} blockedTaskIds={data.result?.blockedTaskIds || []} />
      </div>
    </div>
  );
}

export default Tasks;
