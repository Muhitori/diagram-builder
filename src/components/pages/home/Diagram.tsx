import { DragEvent } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { edgesSelector, nodesSelector } from 'src/store/selector/Node.selector';
import { addNodeAsync } from 'src/store/slice/Diagram.slice';

export const Diagram = () => {
  const dispatch = useDispatch<AppDispatch>();

  const nodes = useSelector(nodesSelector);
  const edges = useSelector(edgesSelector);

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event: DragEvent) => {
    const groupName = event.dataTransfer.getData('groupName');
    const id = event.dataTransfer.getData('id');

    dispatch(addNodeAsync({ groupName, id }));
  }

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow defaultNodes={nodes} defaultEdges={edges} fitView>
        <Controls />
      </ReactFlow>
    </div>
  );
};
