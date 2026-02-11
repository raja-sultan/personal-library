import { Children } from "react";
import type { ReactNode } from "react";

export function CustomChildRenderer({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}): any {
  const childrenArray = Children.toArray(children);
  return childrenArray[index];
}
