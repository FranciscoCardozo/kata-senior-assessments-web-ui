import { Question } from "./question.interface";

export interface AssessmentForm {
  id: string;
  questions: Question[];
}
