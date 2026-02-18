import { type NodeProps, type Node, Handle, Position } from "@xyflow/react";

type TextNode = Node<{ description: string; priority: string; isBlocked: boolean }, "text">;
export const GraphNode = ({ data }: NodeProps<TextNode>) => {
  return (
    <div
      className={`max-w-80 rounded-md border bg-white p-2 shadow-sm ${data.isBlocked ? "border-red-500" : "border-green-500"}`}
    >
      <p className="text-sm font-medium leading-snug">{data.description}</p>

      <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>Priority: {data.priority}</span>

        {data.isBlocked && <span className="rounded bg-red-100 px-2 py-0.5 text-red-700">Blocked</span>}
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
