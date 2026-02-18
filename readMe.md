# InsightBoard "Dependency Engine"

[Site is live here](https://autonomix-insight-board.vercel.app/)

---

## Folder structure

/autonomix-insight-board\
├──/frontend\
├──/backend

## Setup

1. Clone the repository
2. Install requirements:
   - Node.js
   - MongoDB
3. cd frontend
4. npm install
5. Add VITE_API_URL=<your_backend_url> to .env
6. npm run dev if running locally. npm start in production
7. cd backend
8. npm install
9. Add MONGO_URL=<your_mongodb_instance>(if running locally, use MONGO_URI=localhost:27017), PORT=5000 and LLM_API_KEY=<gemini_api_key> to .env
10. npm run dev if running locally. npm start in production

---

## Levels Completed

### ✅ Level 1 - The Robust Backend

- Submit a transcript to generate an interactive dependency graph using ReactFlow
- Structured JSON output from LLM (id, description, priority, and dependencies)
- Validated Dependencies
- Cycle Detection
- Original transcript as well as the generated graphs are stored in a MongoDB database
- Built with Express + React + Shadcn + Tailwind + Reactflow
- Deployed on vercel(UI) and railway(backend)

### ✅ Level 2 - Async Processing & Idempotency

1. Asynchronous Architecture

The application follows a async architecture such that slow AI queries are handled smoothly. Upon submitting a transcript, the data is immediately saved to the database and the user is redirected to a new page `/t/job-id`. The UI then polls the backend with the job-id while the LLM generates the dependency graph from the transcript.

2. Idempotent Submission

When the user submits a transcript, a hash is generated for the transcript such that any future submissions with the same transcript can be matched with the hash and then the cached value from the database is presented to the user bypassing the need to call the LLM API. This way, multiple submissions also go through a preflight check against the hash to prevent misclicks or intentional attacks.

### ✅ Level 3 - Visualization & Interactive UI (Partially Completed)

1. ✅ Graph Visualization

The application used ReactFlow + Dagre to display the generated graph in a clean and beautiful UI. The graph displays both blocked and ready tasks as well as any cycles.

2. ❌ Interactive State

---

## Tech Stack

1. Frontend

- React + Vite
- ReactFlow + Dagre for visualizing
- Shadcn and TailwindCSS for styling

2. Backend

- Node.js + Express
- MongoDB as the database
- Google Gemini as the LLM

3. Deployment

- Vercel(Frontend)
- Railway(Backend)
- MongoDB Atlas(Database)
