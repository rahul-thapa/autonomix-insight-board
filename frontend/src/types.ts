export interface ITask {
  id: string;
  description: string;
  priority: "low" | "medium" | "high";
  dependencies: string[];
  status: "ready" | "blocked" | "error";
}

export interface IJob extends Document {
  hash: string;
  id: string;
  transcript: string;

  status: "pending" | "done" | "error";

  result?: {
    tasks: ITask[];
    blockedTaskIds: string[];
  };

  error?: string;

  startedAt?: Date;
  finishedAt?: Date;
  durationMs?: number;

  createdAt: Date;
  updatedAt: Date;
}
