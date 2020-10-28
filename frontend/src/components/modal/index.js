import React from 'react';
import { ModalWrapper } from './styles/modal';

export default function ModalComponent({ children, ...restProps }) {
  return (
    <>
      <ModalWrapper {...restProps}>{children}</ModalWrapper>
    </>
  );
}
