export interface profileCardWrapperProps {
  icon: React.ReactNode;
  heading: string;
  linkComponent?: React.ReactNode;
  isLinkComponent?: boolean;
  tableData?: any[];
  isReviewsBtn?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
}
