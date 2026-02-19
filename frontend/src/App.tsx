import { Route, Routes } from "react-router-dom";
import TranscriptInput from "@/pages/transcriptInput";
import Tasks from "@/pages/tasks";
import { Error404Page } from "@/components/custom/404Page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TranscriptInput />} />
        <Route path="t/:jobId" element={<Tasks />} />

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
