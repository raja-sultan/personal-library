export interface FormValues {
  body: string;
  from: any;
  sendTo: any;
  subject: string;
  availableToken: string;
  section: {
    name: string;
    description: string;
    questions: questions[];
  };
}

interface questions {
  question: string;
  answer: string;
}
