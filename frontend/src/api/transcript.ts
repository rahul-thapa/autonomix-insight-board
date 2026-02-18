import config from "@/config";
import type { IJob, ITask } from "../types";

export const getTasksById = async (jobId: string): Promise<IJob> => {
  const response = await fetch(`${config.API_URL}/transcript/find?jobId=${jobId}`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const data = await response.json();
  return data.results;
};

export const createTasks = async (transcript: string): Promise<IJob> => {
  const response = await fetch(`${config.API_URL}/transcript/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error);
  if (!response.ok) throw new Error("Failed to submit transcript");

  return data as Promise<IJob>;
};
