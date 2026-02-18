import { JobModel } from "../models/transcripts";
import { generateTasksFromLLM } from "./llm";
import { sanitizeDependencies } from "./helpers";
import { detectCycles } from "./cycleDetection";

export async function processJob(jobId: string) {
  const start = Date.now();

  const job = await JobModel.findOneAndUpdate(
    { _id: jobId, status: "pending" },
    {
      status: "processing",
      startedAt: new Date(),
    },
    { new: true },
  );

  if (!job) return;

  try {
    const rawTasks = await generateTasksFromLLM(job.transcript);
    const cleanTasks = sanitizeDependencies(rawTasks);
    const { blockedIds } = detectCycles(cleanTasks);

    job.status = "done";

    job.result = {
      tasks: cleanTasks,
      blockedTaskIds: blockedIds,
    };

    job.finishedAt = new Date();
    job.durationMs = Date.now() - start;

    await job.save();
  } catch (err) {
    console.error("Job failed:", err);

    await JobModel.findByIdAndUpdate(jobId, {
      status: "error",
      error: (err as Error).message,
      finishedAt: new Date(),
    });
  }
}
