import { useEffect, useState } from "react";
import { getTasksById } from "@/api/transcript";
import type { IJob } from "@/types";
import { useNavigate } from "react-router-dom";

export function useTasks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<IJob | null>(null);

  const jobId = window.location.pathname.split("/t/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId) {
      setError("No job ID found in URL.");
      setLoading(false);
      return;
    }

    let intervalId: number;

    const fetchTasks = async () => {
      try {
        const result = await getTasksById(jobId);

        setData(result);

        if (result.status === "done") {
          clearInterval(intervalId);
          setLoading(false);
        } else if (result.status === "error") {
          clearInterval(intervalId);
          setError(result.error || "An error occurred while processing the job.");
          setLoading(false);
        }
      } catch (err) {
        if (err && typeof err === "object" && "status" in err && (err as any).status === 404) {
          setError("Job not found.");
          clearInterval(intervalId);
          navigate("/404");
        } else {
          setError(err instanceof Error && err.message ? err.message : "Failed to fetch tasks.");
          clearInterval(intervalId);
          setLoading(false);
        }
      }
    };

    fetchTasks();
    intervalId = setInterval(fetchTasks, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [jobId]);

  return { data, loading, error };
}
