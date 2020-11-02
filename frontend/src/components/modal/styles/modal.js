import styled, { css } from 'styled-components/macro';
import { Modal } from 'antd';

export const ModalWrapper = styled(Modal)`
  .ant-modal-body {
    ${(props) =>
      props.editModal &&
      css`
        background-color: rgb(51, 51, 51);
        height: fit-content;
        padding-bottom: 0.1px;
      `}
  }
  .ant-modal-header,
  .ant-modal-footer {
    ${(props) =>
      props.editModal &&
      css`
        background-color: rgb(51, 51, 51);
      `}
    ${(props) =>
      props.login &&
      css`
        background-color: rgb(51, 51, 51);
      `}
    .ant-modal-title {
      ${(props) =>
        props.editModal &&
        css`
          color: white;
        `}
    }
  }
`;
