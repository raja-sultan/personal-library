import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface CreateGroupTypes {
  groupName: string;
  description: string;
  members: string[];
}
export interface SeclectedMember {
  firstName: string;
  lastName: string;
  employeeTitle: string;
  _id: string;
  profileImg: string;
}
export interface CreateGroup {
  onAdd: (data: string[]) => void;
  handleOpen: () => void;
  onSubmit: (formData: CreateGroupTypes) => Promise<void>;
  handleSubmit: any;
  router: AppRouterInstance;
  employeesModal: boolean;
  methods: any;
  setEmployeesModal: React.Dispatch<boolean>;
  selectedMember: SeclectedMember[];
  groupName?: string;
  groupId?: string;
  employeeIds: string[];

}
