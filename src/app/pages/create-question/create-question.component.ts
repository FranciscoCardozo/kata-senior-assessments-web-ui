import { Component } from '@angular/core';

@Component({
  selector: 'app-create-question',
  imports: [],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss'
})
export class CreateQuestionComponent {

  validationFormObject = {
    question: { value: '', valid: false},
    answer: { value: '', valid: false},
    type: { value: '', valid: false},
    difficulty: { value: '', valid: false},
    category: { value: '', valid: false},
  }

  constructor() {
  }

  validateSelectHandler(event: any, key: string) {
    console.log('EVENT:', event);
    (this.validationFormObject as any)[key].value = event;
    (this.validationFormObject as any)[key].valid = true;
  }

  validateInputHandler(event: any, key: string) {
    console.log('Input value:', event);
    const inputRegex = /^[a-zA-Z0-9\s]+$/;
    const isValid = inputRegex.test(event);
    (this.validationFormObject as any)[key].value = event;
    (this.validationFormObject as any)[key].valid = isValid;
  }

  isValidButton() {
    return Object.values(this.validationFormObject).every((field: any) => field.valid);
  }

  handleClickCreate(){
    //TODO CALL SERVICE TO SAVE QUESTION
  }

}
