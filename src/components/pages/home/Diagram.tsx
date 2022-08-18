import ReactFlow, { Controls } from 'react-flow-renderer';
import { useSelector } from 'react-redux';
import { edgesSelector, nodesSelector } from 'src/store/selector/Node.selector';

export const Diagram = () => {
  const nodes = useSelector(nodesSelector);
  const edges = useSelector(edgesSelector)

  return (
    <ReactFlow defaultNodes={nodes} defaultEdges={edges} fitView>
      <Controls />
    </ReactFlow>
  );
};
