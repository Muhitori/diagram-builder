import { FC, useRef } from 'react';
import { useUpdateNodeInternals } from 'react-flow-renderer';
import MoveableComponent, { OnResize, OnRotate } from 'react-moveable';
import { useSelector } from 'react-redux';
import { nodeSizesSelector } from 'src/store/selector/Node.selector';

interface Props {
  node: HTMLElement | null;
  id: string;
  hasChildren: boolean;
  hideMoveable: () => void;
}

const RESIZE_DELTA = 10;

export const Moveable: FC<Props> = ({ node, id, hasChildren, hideMoveable }) => {
  const moveableRef = useRef<MoveableComponent | null>(null);
  const { parent, children } = useSelector(nodeSizesSelector(id));
  const updateNodeInternals = useUpdateNodeInternals();

  const nodeElem = document.querySelector<HTMLElement>(
    `.react-flow__node[data-id="${id}"]`
  );

  if (!node) return null;

  return (
    <MoveableComponent
      ref={moveableRef}
      target={node}
      container={null}
      origin={false}
      edge={false}
      resizable={true}
      throttleResize={2}
      onResize={({ target, width, height }: OnResize) => {
        let fitParent = true;

        if (parent.width && parent.height) {
          fitParent =
            width < parent.width - RESIZE_DELTA &&
            height < parent.height - RESIZE_DELTA;
        }

        const fitChildren =
          width > children.width + RESIZE_DELTA &&
          height > children.height + RESIZE_DELTA;

        if (fitParent && fitChildren) {
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;

          if (nodeElem) {
            nodeElem.style.width = `${width}px`;
            nodeElem.style.height = `${height}px`;
          }
          updateNodeInternals(id);
          moveableRef.current?.updateRect();
        }
      }}
      onResizeEnd={hideMoveable}
      rotatable={!hasChildren}
      rotateAroundControls={true}
      throttleRotate={5}
      rotationTarget={node}
      onRotate={({ target, transform }: OnRotate) => {
        target.style.transform = transform;
        updateNodeInternals(id);
      }}
      onRotateEnd={hideMoveable}
    />
  );
};
