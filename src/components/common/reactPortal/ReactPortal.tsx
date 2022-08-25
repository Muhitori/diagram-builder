import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createWrapperAndAppendToBody } from './portal.helper';

interface Props {
  children: ReactNode;
  wrapperId?: string;
}

export const ReactPortal: FC<Props> = ({ children, wrapperId = 'portaled-wrapper' }) => {
  let wrapper = document.getElementById(wrapperId);

  if (!wrapper) {
    wrapper = createWrapperAndAppendToBody(wrapperId);
  }
  
  return createPortal(children, wrapper);
};
