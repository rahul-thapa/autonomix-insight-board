import { MarkerType, Position, type Edge, type Node } from "@xyflow/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createNodesFromTasks = (tasks: any[], blockedTaskIds: string[]): Node[] => {
  return tasks.map((task, index) => ({
    id: task.id,
    position: {
      x: 200 * (index % 3),
      y: 100 * Math.floor(index / 3),
    },
    data: {
      description: task.description,
      priority: task.priority,
      isBlocked: blockedTaskIds?.includes(task.id),
    },
    type: "graphNode",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }));
};

export const createEdgesFromTasks = (tasks: any[]): Edge[] => {
  const edges: Edge[] = [];
  tasks.forEach((task) => {
    task.dependencies.forEach((depId: string) => {
      edges.push({
        id: `e-${depId}-${task.id}`,
        source: depId, // dependency
        target: task.id, // dependent
        animated: task.status === "blocked",
        // type: "smoothstep",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      });
    });
  });

  return edges;
};
