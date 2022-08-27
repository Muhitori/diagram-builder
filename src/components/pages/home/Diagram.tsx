import { DragEvent, useCallback, useRef, useState, MouseEvent } from 'react';
import ReactFlow, {
  Node,
  Edge,
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
  deleteEdge,
  updateNodes,
} from 'src/store/slice/Diagram.slice';
import debounce from 'lodash/debounce';
import { getExpandedNode, getNodeByCoordinates } from 'src/utils/nodes.helper';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';

export const Diagram = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const nodes = useSelector(nodesSelector);
  const edges = useSelector(edgesSelector);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent) => {
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const groupName = event.dataTransfer.getData('groupName');
      const id = event.dataTransfer.getData('id');

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const otherNodes = nodes.filter((node) => node.id !== id);
      const parentNode = getNodeByCoordinates(
        otherNodes,
        position.x,
        position.y
      );

      dispatch(
        createNodeAsync({
          groupName,
          id,
          position,
          parentNodeId: parentNode?.id,
        })
      );
      snackbarGenerator.success(`Node added to board.`);
    },
    [dispatch, reactFlowInstance, reactFlowWrapper, nodes]
  );

  const nodeDragStopHandler = useCallback(
    (event: MouseEvent, node: Node) => {
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const {x, y} = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      
      const otherNodes = nodes.filter(n => n.id !== node.id);
      const parentNode = getNodeByCoordinates(otherNodes, x, y);

      const isAlreadyParent =  node.parentNode === parentNode?.id;

      if (parentNode && (!node.parentNode || !isAlreadyParent)) {
        const updatedNode: Node = {
          ...node,
          position: {
            x: x - parentNode.position.x,
            y: y - parentNode.position.y
          },
          parentNode: parentNode?.id,
          extent: 'parent',
        };

        const expandedParentNode = getExpandedNode(parentNode, updatedNode);
        dispatch(updateNodes([updatedNode, expandedParentNode]));
      }
    },
    [dispatch, reactFlowInstance, reactFlowWrapper, nodes]
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

  const edgeContextMenuHandler = useCallback(
    (edge: Edge) => {
      dispatch(deleteEdge(edge.id));
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
      onNodeDragStop={nodeDragStopHandler}
      onNodeContextMenu={(event, node) => {
        event.preventDefault();
        nodeContextMenuHandler(node);
      }}
      onEdgeContextMenu={(event, edge) => {
        event.preventDefault();
        edgeContextMenuHandler(edge);
      }}
      fitView
    >
      <Controls />
    </ReactFlow>
  );
};