export interface formsTypes {
    id: number;
    name: string;
    stage?: string;
    requestStatus: any;
  }
  
  export interface accordionTypes {
    id: number;
    title: string;
    subTitle?: string;
    component: any;
  }


export const accordionData: accordionTypes[] = [

  {
    id: 1,
    title: "Job Post Questions",
    subTitle: "Application Review (9 Days)",
    component: "Data Analyst",
  },

];
