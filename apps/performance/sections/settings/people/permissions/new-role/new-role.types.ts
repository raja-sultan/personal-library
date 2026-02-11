export interface RoleFormTypes {
  name?: string;
  description?: string;
}

export type PermissionState = Record<string, boolean>;

export interface PermissionsContentTypes {
  checked: Record<string, boolean>;
  setChecked: React.Dispatch<React.SetStateAction<PermissionState>>;
  checkedIds: string[];
  setCheckedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface PermissionsRoleTypes {
  title: string;
}
