import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useTranscriptInput } from "@/hooks/transcriptInput";
import { useState } from "react";
import SampleTranscript from "@/assets/transcript.txt?raw";

export function TranscriptInput() {
  const { submitTranscript } = useTranscriptInput();
  const [transcript, setTranscript] = useState<string>("");

  const sampleTranscript = () => {
    setTranscript(SampleTranscript);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-3xl rounded-xl border bg-background p-8 shadow-sm">
        <Field>
          <FieldLabel htmlFor="textarea-message" className="font-semibold text-xl">
            Generate Dependency Graph
          </FieldLabel>
          <FieldDescription>
            Paste your meeting transcript and we'll extract tasks and dependencies automatically.
          </FieldDescription>
          <Textarea
            id="textarea-message"
            placeholder="Paste your transcript here."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="min-h-40 max-h-108"
          />
          <Button variant="default" className="cursor-pointer mt-4" onClick={() => submitTranscript(transcript)}>
            Submit Transcript
          </Button>

          <Button variant="ghost" size="sm" className="mt-2 text-muted-foreground" onClick={() => sampleTranscript()}>
            Or use sample transcript
          </Button>
        </Field>
      </div>
    </div>
  );
}

export default TranscriptInput;
