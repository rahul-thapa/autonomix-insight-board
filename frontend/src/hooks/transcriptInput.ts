import { useEffect, useState } from "react";
import { createTasks } from "@/api/transcript";

export function useTranscriptInput() {
  const [jobId, setJobId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // This is ONLY for fetching projects

  // when job id is set, redirect the user to /t/:jobId using react router
  useEffect(() => {
    if (jobId) {
      window.location.href = `/t/${jobId}`;
    }
  }, [jobId]);

  // Instead of setting global error, return error to the caller
  const submitTranscript = async (transcript: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (transcript == "") {
        setError("Transcript cannot be empty.");
        return { success: false, error: "Transcript cannot be empty." };
      }
      setLoading(true);
      const job = await createTasks(transcript);
      setJobId(job.id);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error && err.message ? err.message : "Failed to submit transcript. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  return { jobId, loading, error, submitTranscript };
}
