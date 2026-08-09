import { Component } from '@angular/core';
import { Question } from '../../models/interfaces/question.interface';
import { QuestionType } from '../../models/enums/questionType.enum';
import { QuestionCategory } from '../../models/enums/questionCategory.enum';
import { QuestionDifficulty } from '../../models/enums/questionDifficulty.enum';
import { QuestionService } from '../../services/questionService/question.service';
import { EventsService } from '../../services/eventsService/events.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-create-question',
  imports: [NgIf],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss'
})
export class CreateQuestionComponent {

  validationFormObject:  any = {
    question: { value: '', valid: false},
    answer: { value: '', valid: false},
    type: { value: '', valid: false},
    difficulty: { value: '', valid: false},
    category: { value: '', valid: false},
    options: { value: [], valid: true}
  }

  lastOption!: string;

  constructor(
    private readonly questionService: QuestionService,
    private readonly eventsService: EventsService
  ) {
  }

  validateSelectHandler(event: any, key: string) {
    (this.validationFormObject as any)[key].value = event.target.value;
    (this.validationFormObject as any)[key].valid = true;
  }

  validateInputHandler(event: any, key: string) {
    const value = event.target.value;
    const inputRegex = /^[\p{L}\p{M}\p{N}\s¿?]+$/u;
    const isValid = inputRegex.test(value);
    (this.validationFormObject as any)[key].value = value;
    (this.validationFormObject as any)[key].valid = isValid;
  }

  isValidButton() {
    return Object.values(this.validationFormObject).every((field: any) => field.valid);
  }

  handleClickCreate(){
    const body: Question = {
      text: this.validationFormObject.question.value,
      type: this.validationFormObject.type.value as QuestionType,
      answer: this.validationFormObject.answer.value,
      difficulty: this.validationFormObject.difficulty.value as QuestionDifficulty,
      category: this.validationFormObject.category.value as QuestionCategory,
      options: this.validationFormObject.options.value
    }


    this.questionService.registryQuestion(body)
    .then((response: any)=>{
      console.log(response)
      this.eventsService.openModal({
        open: true,
        title: 'Petición completada',
        description: 'Se ha guardado satisfactoriamente la pregunta.'
      });
    })
    .catch((err: any) => {
      this.eventsService.openModal({
        open: true,
        title: 'Ups!, estamos presentando problemas',
        description: 'Por favor intenta guardar la pregunta de nuevo en unos minutos.'
      });
    });

  }

  updateLastOption(event: any){
    this.lastOption = event.target.value;
    console.log(event.target.value);
    console.log(this.lastOption);
  }

  addOption(event: any){
    this.validationFormObject.options.value.push(this.lastOption);
    console.log(this.validationFormObject);
  }
}
