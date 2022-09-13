import { CSSProperties } from 'react';
import { v4 as uuid } from 'uuid';
import { Edge, Node, XYPosition } from 'react-flow-renderer';
import { IElement } from 'src/types/Elements';
import { ConnectedNode } from 'src/types/Nodes';
import { getElementBackgroundColor } from './UI.helper';

export const elementToNode = (element: IElement, position: XYPosition): Node => {
  const { name, content, color } = element;

  const id = uuid();
  const type = 'custom-default';

  const backgroundColor = getElementBackgroundColor(color);

  const data = {
    label: name,
    content,
    backgroundColor,
  };

  const width = 150;
  const height = 40;

  const styledSize = {
    width: width + 'px',
    height: height + 'px',
  };

  return {
    id,
    type,
    data,
    width,
    height,
    style: { ...styledSize },
    position,
    positionAbsolute: position
  };
};


export const getNodeById = (nodes: Node[], id: string) => {
  return nodes.find(node => node.id === id);
}

const getSortedBy = (connectedNodes: ConnectedNode[], key: keyof ConnectedNode) => {
  const sortedNodes = [...connectedNodes];
  sortedNodes.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  return sortedNodes;
}

export const getOffset = (nodes: Node[], parentNodeId: string  | undefined) => {
  let x = 0;
  let y = 0;
  let parentId = parentNodeId;

  while (parentId) {
    const parentNode = getNodeById(nodes, parentId);

    if (!parentNode) break;

    x += parentNode.position.x;
    y += parentNode.position.y;
    parentId = parentNode.parentNode;
  }

  return { x, y };
}

export const getConnectedNodes = (
  nodes: Node[],
  edges: Edge[],
  currentNodeId: string | null
): ConnectedNode[] => {
  if (!currentNodeId) return [];

  const getNodeNameById = (nodeId: string) => {
    const connectedNode = nodes.find((node) => node.id === nodeId);
    return connectedNode?.data.label;
  };

  const filteredEdges = edges.filter(
    (edge) => edge.source === currentNodeId || edge.target === currentNodeId
  );

  const connectedNodes = filteredEdges
    .map((edge) => {
      if (currentNodeId === edge.source) {
        return {
          key: 'output' + edge.target,
          label: 'Output',
          name: getNodeNameById(edge.target),
        };
      }

      return {
        key: 'input' + edge.source,
        label: 'Input',
        name: getNodeNameById(edge.source),
      };
    });
  
  return getSortedBy(connectedNodes, 'label');
};

export const getNodeByCoordinates = (nodes: Node[], x: number, y: number) => {
  const fitByX = ({ position, positionAbsolute, width }: Node) => {
    if (!width) return false;
    const nodeX = positionAbsolute?.x || position.x;
    return x > nodeX && x < nodeX + width;
  };

  const fitByY = ({ position, positionAbsolute, height }: Node) => {
    if (!height) return false;
    const nodeY = positionAbsolute?.y || position.y;
    return y > nodeY && y < nodeY + height;
  };

  const potentialParents = nodes.filter((node) => {
    return fitByX(node) && fitByY(node);
  });

  //last child - maximum nesting length
  if (potentialParents.length > 0) {
    return potentialParents[potentialParents.length - 1];
  }
}

export const expandNode = (
  node: Node | undefined,
  widthToExpand: number | null | undefined,
  heightToExpand: number | null | undefined
) => {
  if (!node || !widthToExpand || !heightToExpand) return;

  const deltaWidth = 0;
  const deltaHeight = 50;

  const { width, height } = node;

  const sizeExists = width && height;
  if (!sizeExists) return;

  const newWidth = width + widthToExpand + deltaWidth;
  const newHeight = height + heightToExpand + deltaHeight;

  const style: CSSProperties = {
    width: newWidth + 'px',
    height: newHeight + 'px',
  };

  return {
    ...node,
    width: newWidth,
    height: newHeight,
    style: {
      ...node.style,
      ...style,
    },
  };
};

export const expandNodeByChild = (parentNode: Node | undefined, childNode: Node | undefined) => {
  if (!parentNode || !childNode) return;
  const { width, height } = childNode;
  return expandNode(parentNode, width, height);
}

const getParentNode = (nodes: Node[], parentId: string | undefined) =>
  nodes.find((n) => n.id === parentId);

export const getNodesToUpdate = (
  nodes: Node[],
  newNode: Node,
  parentNodeId: string | undefined
) => {
  const nodesToUpdate: (Node | undefined)[] = [newNode];
  const parentNode = getParentNode(nodes, parentNodeId);

  let expandedParentNode = expandNodeByChild(parentNode, newNode);
  nodesToUpdate.push(expandedParentNode);

  while (expandedParentNode && expandedParentNode.parentNode) {
    const grandParentNode = getParentNode(nodes, expandedParentNode.parentNode);
    expandedParentNode = expandNode(grandParentNode, 120, 40);
    nodesToUpdate.push(expandedParentNode);
  }

  return nodesToUpdate.filter((node) => Boolean(node)) as Node[];
};

// Returns nodes state with new nodes merged in
export const updateNodesHelper = (nodes: Node[], nodesToUpdate: (Node | undefined)[]) => {
  const filteredNodes: Node[] = nodesToUpdate.filter((node) =>
    Boolean(node)
  ) as Node[];
  const nodeIds = filteredNodes.map((node) => node.id);

  const updatedNodes = nodes.map((node) => {
    if (nodeIds.includes(node.id)) {
      return filteredNodes.find((n) => n.id === node.id) || node;
    }
    return node;
  });

  return updatedNodes;
}

export const getNodesWithNewChild = (nodes: Node[], node: Node, parentNodeId: string | undefined) => {
  if (!parentNodeId) return [...nodes, node];

  const parents = getNodesToUpdate(nodes, node, parentNodeId);

  const {
    position: { x, y },
  } = node;
  const { x: offsetX, y: offsetY } = getOffset(nodes, parentNodeId);

  //Each parent - new coordinate system, so we need to subtract parents positions
  const position = {
    x: x - offsetX,
    y: y - offsetY
  };

  const positionAbsolute = {
    x: x,
    y: y,
  };

  const parentOptions = {
    parentNode: parentNodeId,
    extent: 'parent' as const,
  };

  //update all parent nodes (parent nodes size are increased)
  const updatedParents = updateNodesHelper(nodes, parents);

  const newNode: Node = {
    ...node,
    ...parentOptions,
    position,
    positionAbsolute,
  };

  return [...updatedParents, newNode];
}

export const getParent = (nodes: Node[], nodeId: string, x: number, y: number) => {
  let otherNodes = nodes.filter((node) => node.id !== nodeId);
  let parent = nodes.find((node) => node.id === nodeId);

  while (parent) {
    otherNodes = otherNodes.filter((node) => node.parentNode !== parent?.id);
    parent = nodes.find((node) => node.parentNode === parent?.id);
  }

  return getNodeByCoordinates(otherNodes, x, y);
}

export const deleteNodeEdges = (edges: Edge[], nodeId: string) => {
  return edges.filter(
    (edge) => edge.source !== nodeId && edge.target !== nodeId
  );
}