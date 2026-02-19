import { JobModel } from "../models/transcripts";

export async function findTranscriptByHash(hash: string) {
  return await JobModel.findOne({ hash });
}

export async function findTranscriptById(id: string) {
  return await JobModel.findOne({ _id: id });
}

export async function createJob(hash: string, transcript: string) {
  const job = new JobModel({
    hash,
    transcript,
  });
  await job.save();
  return job;
}
