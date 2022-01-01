export type ModalType = {
  head?: boolean;
  label?: string;
  body: JSX.Element;
  maskCloseable?: boolean;
  onOk: (e: Event) => any;
  onClose: (e: Event) => any;
  okText?: string;
  closeText?: string;
  width?: number;
};
