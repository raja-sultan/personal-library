export interface ISectionType {
  question: IQuestionType[];
  sectionHeader: string;
  statement: string;
  sections: ISection[];
}
interface IQuestionType {
  question: string;
  answerType: string;
  options: string[];
  required: boolean;
}
interface ISection {
  name: string;
  statement: string;
  questions: IQuestionType[];
}
