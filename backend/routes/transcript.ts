import { Request, Response, Router } from "express";
import * as db from "../db/actions";
import { createTranscriptHash } from "../utils/helpers";
import { processJob } from "../utils/processJobs";
import mongoose from "mongoose";

const router = Router();

async function processTranscript(req: Request, res: Response) {
  try {
    const { transcript } = req.body;
    const hash = createTranscriptHash(transcript);

    // check for hash
    const existingJob = await db.findTranscriptByHash(hash);
    if (existingJob) {
      if (existingJob.status === "done") {
        res.status(200).json({ message: "Transcript already processed", id: existingJob._id, result: existingJob.result });
        return;
      } else if (existingJob.status === "error") {
        // Allows errored out jobs to be reprocessed if the same transcript is submitted again
        existingJob.status = "pending";
        existingJob.error = undefined;
        await existingJob.save();
        setImmediate(() => processJob(existingJob._id.toString()));
        res.status(200).json({ message: "Transcript is being processed", id: existingJob._id });
        return;
      } else {
        res.status(200).json({ message: "Transcript is already being processed", id: existingJob._id });
        return;
      }
    }

    const job = await db.createJob(hash, transcript);
    res.status(201).json({ message: "Transcript submitted successfully", id: job._id });

    setImmediate(() => processJob(job._id.toString()));
  } catch (error) {
    res.status(500).json({ error: "Failed to submit transcript" });
  }
}

async function getTasksById(req: Request, res: Response) {
  try {
    const jobId = req.query.jobId as string;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(404).json({ error: "Invalid job ID" });
    }

    const result = await db.findTranscriptById(jobId);
    if (!result) {
      res.status(404).json({ error: "Tasks not found" });
      return;
    }
    res.status(200).json({ message: "Tasks found", results: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to find tasks" });
    console.log(error);
  }
}

router.post("/transcript/create", processTranscript);
router.get("/transcript/find", getTasksById);

export default router;
