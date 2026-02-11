export interface HeaderCardDataType {
  id: number;
  icon: React.ReactNode;
  title: string;
  description:string;
}

export interface CarrerProps {
  headerCardData: HeaderCardDataType[];
}
