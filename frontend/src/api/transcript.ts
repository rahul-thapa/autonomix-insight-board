import config from "@/config";
import type { IJob } from "../types";

export const getTasksById = async (jobId: string): Promise<IJob> => {
  const response = await fetch(`${config.API_URL}/transcript/find?jobId=${jobId}`);
  const data = await response.json();
  if (!response.ok) {
    const error: any = new Error(data?.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data.results;
};

export const createTasks = async (transcript: string): Promise<IJob> => {
  const response = await fetch(`${config.API_URL}/transcript/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  const data = await response.json();
  if (!response.ok) {
    const error: any = new Error(data?.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return data as Promise<IJob>;
};
