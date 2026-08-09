import { QuestionCategory } from "../enums/questionCategory.enum";
import { QuestionDifficulty } from "../enums/questionDifficulty.enum";
import { QuestionType } from "../enums/questionType.enum";

export interface Question {
  SK?: string;
  PK?: string;
  id?: string;
  text: string;
  type: QuestionType;
  answer: string;
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
  options?: string[];
}
