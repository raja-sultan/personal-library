export interface Column {
    id: string;
    title: string;
  }
  
  export interface PlanContent {
    description: string[];
  }
  
  export interface PlanData {
    _id: string;
    skills: any;
    content: PlanContent[];
  }
  
  export interface CustomCareersPlansProps {
    getData?:any;
    columns?: Column[];
    data?: any;
    isLoading?: any;
    handleNextTab?: () => void;
  }