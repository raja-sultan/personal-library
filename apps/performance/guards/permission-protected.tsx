import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, Attributes, ReactElement } from "react";
import { useSelector } from "react-redux";

interface PermissionProps {
  children: ReactNode;
  permission?: { id: string; name: string };
  disabled?: boolean;
}

export function PermissionProtected(
  props: PermissionProps
): any {
  const { children, permission, disabled } = props;
  const {
    user: { userPermissions },
  } = useSelector((state: any) => state.auth);

  if (!permission) {
    const singleChild = Children.only(children);
    return isValidElement(singleChild) ? singleChild : null;
  }

  const hasPermission = Boolean(userPermissions[permission.id]);

  if (!hasPermission) {
    if (disabled) {
      return (
        <>
          {Children.map(children, (child) => {
            return isValidElement(child)
              ? cloneElement(
                  child as ReactElement,
                  { disabled: true } as Attributes
                )
              : child;
          })}
        </>
      );
    }
    return null;
  }

  console.log(children)

  return children;
}
