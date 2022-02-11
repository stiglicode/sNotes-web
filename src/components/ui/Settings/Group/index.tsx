import React from "react";

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
}

const GroupBox: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={"group-wrapper"}>
      <span className={"group-head"}>{title}</span>
      <div className={"group-body"}>{React.Children.map(children, (child) => child)}</div>
    </div>
  );
};

export default GroupBox;
