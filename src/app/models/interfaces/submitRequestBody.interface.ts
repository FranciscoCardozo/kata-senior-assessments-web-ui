import { LanguageId } from "../enums/languageId.enum";

export interface SubmitRequestBody{
  "languageId": LanguageId;
  "sourceCode": string;
}
