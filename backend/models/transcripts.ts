import mongoose, { Schema, Document, Model } from "mongoose";

// Types
export interface ITask {
  id: string;
  description: string;
  priority: "low" | "medium" | "high";
  dependencies: string[];
  status: "ready" | "blocked" | "error";
}

export interface IJob extends Document {
  hash: string;
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

// Schema

const TaskSchema = new Schema<ITask>(
  {
    id: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    dependencies: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["ready", "blocked", "error"],
      default: "ready",
    },
  },
  { _id: false }, // Important: don't create _id for each task
);

const JobSchema = new Schema<IJob>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    transcript: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "done", "error"],
      default: "pending",
    },

    result: {
      tasks: {
        type: [TaskSchema],
        default: [],
      },
      blockedTaskIds: {
        type: [String],
        default: [],
      },
    },

    error: {
      type: String,
    },

    startedAt: Date,
    finishedAt: Date,
    durationMs: Number,
  },
  {
    timestamps: true,
  },
);

export const JobModel: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
