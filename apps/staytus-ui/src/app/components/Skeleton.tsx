import React, { ReactNode } from 'react';
interface Props {
  children?: ReactNode;
  className?: string;
}

export default function Skeleton({ children, className }: Props) {
  return <div className={`load ${className}`}>{children}</div>;
}
