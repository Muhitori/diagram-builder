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
import {
  expandNodeByChild,
  getNodeByCoordinates,
  getOffset,
  getParent,
} from 'src/utils/nodes.helper';
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
    },
    [dispatch, reactFlowInstance, reactFlowWrapper, nodes]
  );

  const nodeDragStopHandler = debounce(useCallback(
    (event: MouseEvent, node: Node) => {
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const { x, y } = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
    
      const parentNode = getParent(nodes, node.id, x, y);
      if (!parentNode) return;

      const isAlreadyParent = node.parentNode === parentNode.id;

      if (!node.parentNode && !isAlreadyParent) {
        const offset = getOffset(nodes, parentNode.id);

        const updatedNode: Node = {
          ...node,
          position: {
            x: x - offset.x,
            y: y - offset.y,
          },
          positionAbsolute: {
            x: x,
            y: y,
          },
          parentNode: parentNode.id,
          extent: 'parent',
        };
        const expandedParentNode = expandNodeByChild(parentNode, updatedNode);
        dispatch(updateNodes([expandedParentNode, updatedNode]));
        snackbarGenerator.success(`Node ${node.data.label} updated as child of ${parentNode.data.label}.`);
      }
    },
    [dispatch, reactFlowInstance, reactFlowWrapper, nodes]
  ));

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