import { FC, useRef } from 'react';
import MoveableComponent, { OnResize, OnRotate } from 'react-moveable';

interface Props {
  node: HTMLElement | null;
  id: string;
}

export const Moveable: FC<Props> = ({ node }) => {
  const moveableRef = useRef<MoveableComponent | null>(null);

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
      }}
      rotatable={true}
      rotateAroundControls={true}
      throttleRotate={5}
      onRotate={({ target, transform }: OnRotate) => {
        target.style.transform = transform;
      }}
    />
  );
};
