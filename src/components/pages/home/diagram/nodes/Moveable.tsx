import { FC, useEffect, useRef } from 'react';
import MoveableComponent, { OnResize, OnRotate } from 'react-moveable';

interface Props {
  node: HTMLElement | null;
  id: string;
}

export const Moveable: FC<Props> = ({ node, id }) => {
  const moveableRef = useRef<MoveableComponent | null>(null);

  const nodeElem = document.querySelector<HTMLElement>(
    `.react-flow__node[data-id="${id}"]`
  );
  
  useEffect(() => {
    moveableRef.current?.updateRect();
  }, [nodeElem?.style.width, nodeElem?.style.height]);

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
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;

        if (nodeElem) {
          nodeElem.style.width = `${width}px`;
          nodeElem.style.height = `${height}px`;
        }
      }}
      rotatable={true}
      rotateAroundControls={true}
      throttleRotate={5}
      rotationTarget={node}
      onRotate={({ target, transform }: OnRotate) => {
        target.style.transform = transform;
      }}
    />
  );
};
