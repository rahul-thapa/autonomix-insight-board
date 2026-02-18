import { ITask } from "../models/transcripts";
import crypto from "node:crypto";

// Normalizes transcript, standardizes line endings and trims whitespaces
function normalizeTranscript(text: string): string {
  return text.normalize("NFKC").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

export const createTranscriptHash = (transcript: string): string => {
  const normalized = normalizeTranscript(transcript);
  return crypto.createHash("sha256").update(normalized).digest("hex");
};

const safeString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;

  const str = value.trim();
  if (!str) return null;

  return str;
};

// Validates dependency array
const normalizeDeps = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter((v) => v !== "");
};

export const sanitizeDependencies = (raw: unknown): ITask[] => {
  if (!Array.isArray(raw)) {
    console.log("Expected an array of tasks from LLM, but got:", raw);
    return [];
  }
  const VALID_PRIORITIES = new Set(["low", "medium", "high"]);

  const tasks: ITask[] = [];

  const validIds = new Set<string>();

  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;

    const id = safeString((item as any).id);

    if (id) {
      validIds.add(id);
    }
  }

  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;

    const obj = item as any;

    const id = safeString(obj.id);
    const description = safeString(obj.description);

    if (!id || !description) continue;

    let priority: "low" | "medium" | "high" = "medium";

    if (typeof obj.priority === "string") {
      const p = obj.priority.toLowerCase();

      if (VALID_PRIORITIES.has(p)) {
        priority = p as any;
      }
    }

    const dependencies = normalizeDeps(obj.dependencies).filter((d) => validIds.has(d));

    tasks.push({
      id,
      description,
      priority,
      dependencies: dependencies,
      status: "ready",
    });
  }

  return tasks;
};
