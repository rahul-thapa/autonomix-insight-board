/* eslint-disable react-hooks/set-state-in-effect */
import type { ITask } from "@/types";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { GraphNode } from "./graphNode";
import { createEdgesFromTasks, createNodesFromTasks } from "@/lib/utils";
import { layoutGraph } from "@/lib/autoLayout";

interface GraphProps {
  tasks: ITask[];
  blockedTaskIds: string[];
}

export default function Graph({ tasks, blockedTaskIds }: GraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);
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
