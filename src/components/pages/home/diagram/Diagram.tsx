import { DragEvent, useCallback, useRef, useState, MouseEvent, useMemo } from 'react';
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
  deleteEdge,
  updateNodes,
} from 'src/store/slice/Diagram.slice';
import debounce from 'lodash/debounce';
import {
  getNodeByCoordinates,
  getNodesToUpdate,
  getOffset,
  getNotSiblingNode,
} from 'src/utils/helpers/nodes.helper';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { DefaultNode } from './nodes';


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
    
      const parentNode = getNotSiblingNode(nodes, node.id, x, y);
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

        //update current node and all his parents (parents size will be increased)
        const nodesToUpdate = getNodesToUpdate(nodes, updatedNode, parentNode.id);
        dispatch(updateNodes(nodesToUpdate));
        
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

  const edgeContextMenuHandler = useCallback(
    (edge: Edge) => {
      dispatch(deleteEdge(edge.id));
    },
    [dispatch]
  );

  const nodeTypes = useMemo(
    () => ({
      'custom-default': DefaultNode
    }),
    []
  );

  return (
    <ReactFlow
      ref={reactFlowWrapper}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={nodesChangeHandler}
      onEdgesChange={edgesChangeHandler}
      onConnect={connectHandler}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onInit={setReactFlowInstance}
      onNodeDragStop={nodeDragStopHandler}
      onNodeContextMenu={(event) => event.preventDefault()}
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