interface Field {
    type: "select" | "search";
    FieldProps: {
      name: string;
      label?: string;
      placeholder?: string;
    };
    options?: {
      value: string;
      name: string;
      id: number;
      label: string;
    }[];
  }
  export interface CandidateReportTypes {
    FirstName: string;
    LastName: string;
    Title: string;
    Company: string;
    PhoneHome: string;
    PhoneWork: string;
    PhoneOther: string;

    
  }
export const tableDataSelectField: Field[] = [
    
    {
      type: "search",
      FieldProps: {
        name: "search",
        placeholder: "Search Tasks",
      },
    },
  ];
  export const data:CandidateReportTypes[]=[
    {
      "FirstName": "David",
      "LastName": "Miller",
      "Title": "Sr BA",
      "Company": "Orcalo",
      "PhoneHome": "",
      "PhoneWork": "",
      "PhoneOther": "+9273488932923",
      
  },
  {
    "FirstName": "Miller",
    "LastName": "David",
    "Title": "Jr BA",
    "Company": "Orcalo",
    "PhoneHome": "",
    "PhoneWork": "",
    "PhoneOther": "+9273488932923",
    
}
  ]