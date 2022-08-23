import { DragEvent, useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Node,
  Connection,
  Controls,
  EdgeChange,
  NodeChange,
  ReactFlowInstance,
} from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { edgesSelector, nodesSelector } from 'src/store/selector/Node.selector';
import {
  createNodeAsync,
  onConnect,
  onEdgesChange,
  onNodesChange,
  onNodeClick,
  deleteNode,
} from 'src/store/slice/Diagram.slice';
import debounce from 'lodash/debounce';

export const Diagram = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const nodes = useSelector(nodesSelector);
  const edges = useSelector(edgesSelector);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, [])

  const handleDrop = useCallback(
    (event: DragEvent) => {
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const groupName = event.dataTransfer.getData('groupName');
      const id = event.dataTransfer.getData('id');

      dispatch(createNodeAsync({ groupName, id, position }));
    },
    [dispatch, reactFlowInstance]
  );

  const nodesChangeHandler = debounce(useCallback(
    (changes: NodeChange[]) => dispatch(onNodesChange(changes)),
    [dispatch]
  ));
  
  const edgesChangeHandler = debounce(useCallback(
    (changes: EdgeChange[]) => dispatch(onEdgesChange(changes)),
    [dispatch]
  ));
  
  const connectHandler = useCallback(
    (connection: Connection) => dispatch(onConnect(connection)),
    [dispatch]
  );

  const nodeClickHandler = useCallback(
    (node: Node) => dispatch(onNodeClick(node)),
    [dispatch]
  );

  const nodeContextMenuHandler = useCallback(
    (node: Node) => {
      dispatch(deleteNode(node.id));
    },
    [dispatch]
  );

  return (
    <ReactFlow
      ref={reactFlowWrapper}
      nodes={nodes}
      edges={edges}
      onNodesChange={nodesChangeHandler}
      onEdgesChange={edgesChangeHandler}
      onConnect={connectHandler}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onInit={setReactFlowInstance}
      onNodeClick={(event, node) => nodeClickHandler(node)}
      onNodeContextMenu={(event, node) => {
          event.preventDefault();
          nodeContextMenuHandler(node);
        }
      }
      fitView
    >
      <Controls />
    </ReactFlow>
  );
};
