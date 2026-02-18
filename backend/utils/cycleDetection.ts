import type { ITask } from "../models/transcripts";

const buildGraph = (tasks: ITask[]): Map<string, string[]> => {
  const graph = new Map<string, string[]>();
  for (const task of tasks) {
    graph.set(task.id, []);
  }
  for (const task of tasks) {
    for (const dependency of task.dependencies) {
      if (!graph.has(dependency)) {
        graph.set(dependency, []);
      }
      graph.get(dependency)?.push(task.id);
    }
  }

  return graph;
};
export function detectCycles(tasks: ITask[]): { blockedIds: string[] } {
  const graph = buildGraph(tasks);

  const visited = new Map<string, "unvisited" | "visiting" | "visited">();
  const stack: string[] = [];
  const nodesInCycles = new Set<string>();

  for (const node of graph.keys()) {
    visited.set(node, "unvisited");
  }

  const dfs = (node: string): void => {
    visited.set(node, "visiting");
    stack.push(node);

    const neighbors = graph.get(node) ?? [];

    for (const newNeighbor of neighbors) {
      const nodeState = visited.get(newNeighbor);

      if (nodeState === "visiting") {
        const startIndex = stack.indexOf(newNeighbor);

        for (let i = startIndex; i < stack.length; i++) {
          nodesInCycles.add(stack[i]);
        }
      }

      if (nodeState === "unvisited") {
        dfs(newNeighbor);
      }
    }

    stack.pop();
    visited.set(node, "visited");
  };

  for (const node of graph.keys()) {
    if (visited.get(node) === "unvisited") {
      dfs(node);
    }
  }

  return {
    blockedIds: Array.from(nodesInCycles).map((id) => id),
  };
}
