import { Route, Routes } from "react-router-dom";
import TranscriptInput from "./pages/transcriptInput";
import Tasks from "./pages/tasks";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TranscriptInput />} />
        <Route path="t/:jobId" element={<Tasks />} />

        <Route path="*" element={<div>Error 404: Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
