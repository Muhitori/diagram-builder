import { FC } from 'react';
import MoveableComponent, { OnDrag, OnResize, OnRotate, OnScale } from 'react-moveable';

interface Props {
  node: HTMLElement | null;
}

export const Moveable: FC<Props> = ({ node }) => {

  if (!node) return null;

  return (
    <MoveableComponent
      target={node}
      container={null}
      origin={true}
      edge={false}
      draggable={true}
      throttleDrag={0}
      onDrag={({ target, left, top }: OnDrag) => {
        target.style.left = `${left}px`;
        target.style.top = `${top}px`;
      }}
      keepRatio={true}
      resizable={true}
      throttleResize={0}
      onResize={({ target, width, height }: OnResize) => {
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
      }}
      scalable={true}
      throttleScale={0}
      onScale={({ target, transform }: OnScale) => {
        target.style.transform = transform;
      }}
      /* rotatable */
      rotatable={true}
      onRotate={({ target, transform }: OnRotate) => {
        target.style.transform = transform;
      }}
    />
  );
};
