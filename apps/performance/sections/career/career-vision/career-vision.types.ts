export interface UserInfoType {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  userRole: string;
}

export interface CareerVisionType {
  id: string;
  title: string;
  description: string;
  // userInfo:UserInfoType[];
}

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
