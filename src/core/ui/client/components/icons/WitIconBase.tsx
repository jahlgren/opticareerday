import React, { ReactNode } from "react";

export type IconProps = {
  size?: number
}

const withIconBase = (Component: any) => {
  const MyComp = ({ size = 24 }: IconProps) => (
    <Component width={size} height={size} />
  );
  MyComp.displayName = 'withIconBaseHoc'
  return MyComp;
}

export default withIconBase;
