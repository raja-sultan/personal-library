export interface AuditLogTypes {
  type: "search" | "select";
  FieldProps: {
    name: string;
    placeholder?: string;
    label?: string;
  };
  options?: { label: string; value: string }[];
}
