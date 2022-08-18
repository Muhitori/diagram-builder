import { DragEvent, useCallback } from 'react';
import ReactFlow, { applyNodeChanges, Connection, Controls, NodeChange } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { edgesSelector, nodesSelector } from 'src/store/selector/Node.selector';
import { addEdge, addNodeAsync, updateEdges, updateNodes } from 'src/store/slice/Diagram.slice';

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

  // const onNodesChange = useCallback(
  //   (changes: NodeChange[]) => {
  //     dispatch(updateNodes(applyNodeChanges(changes, nodes)))
  //   },
  //   [dispatch]
  // );
  
  // const onEdgesChange = useCallback(
  //   (changes: EdgeChange[]) =>
  //     dispatch(updateEdges(applyEdgeChanges(changes, edges))),
  //   [dispatch]
  // );
  
  const onConnect = useCallback(
    (connection: Connection) => {
      const { source, target } = connection;

      if (source && target) {
        dispatch(addEdge({sourceId: source, targetId: target}));
      }
    },
    [dispatch]
  );

  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      fitView
    >
      <Controls />
    </ReactFlow>
  );
};
