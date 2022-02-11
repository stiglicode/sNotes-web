import React from "react";

export interface IModalList {
  icon: React.ReactNode;
  label: string;
  notifications: number;
  target: string;
}

export interface IModal {
  head?: boolean;
  label?: string | React.ReactNode;
  body: JSX.Element;
  maskCloseable?: boolean;
  onOk?: (e: Event) => any;
  onClose?: (e: Event) => any;
  okText?: string;
  closeText?: string;
  width?: number;
  footer?: boolean;
  bodyPadding?: boolean;
  headPadding?: boolean;
  list: IModalList[];
}
