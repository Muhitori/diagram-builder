import { CSSProperties } from 'react';
import { v4 as uuid } from 'uuid';
import { Edge, Node, getRectOfNodes, XYPosition } from 'react-flow-renderer';
import { IElement } from 'src/types/Elements';
import { ConnectedNode } from 'src/types/Nodes';
import { getElementBackgroundColor } from './UI.helper';

export const elementToNode = (element: IElement, position: XYPosition): Node => {
  const { name, content, color } = element;

  const id = uuid();
  const data = {
    label: name,
    content,
  };

  const backgroundColor = getElementBackgroundColor(color);

  const width = 150;
  const height = 40;

  const styledSize = {
    width: width + 'px',
    height: height + 'px',
  };

  return {
    id,
    data,
    width,
    height,
    style: { backgroundColor, ...styledSize },
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
  const fitByX = ({ position, width }: Node) => {
    if (!width) return false;
    const nodeX = position.x;
    return x > nodeX && x < nodeX + width;
  };

  const fitByY = ({ position, height }: Node) => {
    if (!height) return false;
    const nodeY = position.y;
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

export const getExpandedNode = (
  parentNode: Node | undefined,
  childNode: Node | undefined
) => {
  if (!parentNode || !childNode) return;

  const { width, height } = parentNode;
  const { width: childWidth, height: childHeight } = childNode;

  const sizeExists = width && height && childWidth && childHeight;
  if (!sizeExists) return;

  const newWidth = width + childWidth;
  const newHeight = height + childHeight + 50;

  const style: CSSProperties = {
    width: newWidth + 'px',
    height: newHeight + 'px',
  };

  return {
    ...parentNode,
    width: newWidth,
    height: newHeight,
    style: {
      ...parentNode.style,
      ...style,
    },
  };
};

export const insertNewNodeAsChild = (nodes: Node[], newNode: Node, parentNodeId: string | undefined) => {
  const parentNode = nodes.find((n) => n.id === parentNodeId);
  const expandedParentNode = getExpandedNode(parentNode, newNode);

  const filteredNodes: Node[] = [newNode, expandedParentNode].filter(
    (node) => Boolean(node)
  ) as Node[];
  const nodeIds = filteredNodes.map((node) => node.id);

  const updatedNodes = nodes.map((node) => {
    if (nodeIds.includes(node.id)) {
      return filteredNodes.find((n) => n.id === node.id) || node;
    }
    return node;
  });

  if (expandedParentNode) {
    const { x, y } = getRectOfNodes([expandedParentNode]);

    newNode.position.x -= x;
    newNode.position.y -= y;
  }

  const parentOptions = {
    parentNode: parentNodeId,
    extent: 'parent' as const,
  };

  return [...updatedNodes, { ...newNode, ...parentOptions }];
}

export const deleteNodeEdges = (edges: Edge[], nodeId: string) => {
  return edges.filter(
    (edge) => edge.source !== nodeId && edge.target !== nodeId
  );
}