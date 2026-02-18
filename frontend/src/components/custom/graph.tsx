import type { ITask } from "@/types";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { GraphNode } from "./graphNode";
import { createEdgesFromTasks, createNodesFromTasks } from "@/lib/utils";
import { layoutGraph } from "@/lib/autoLayout";

export default function Graph({ tasks, blockedTaskIds }: { tasks: ITask[]; blockedTaskIds: string[] }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback((changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);
  const nodeTypes = {
    graphNode: GraphNode,
  };
  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }
    const rawNodes = createNodesFromTasks(tasks, blockedTaskIds);
    const edges = createEdgesFromTasks(tasks);

    // Auto layout
    const layoutedNodes = layoutGraph(rawNodes, edges, "LR");

    setNodes(layoutedNodes);
    setEdges(edges);
  }, [tasks, blockedTaskIds]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
