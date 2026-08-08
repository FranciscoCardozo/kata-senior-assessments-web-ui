import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Question } from '../../models/interfaces/question.interface';
import { QuestionCategory } from '../../models/enums/questionCategory.enum';
import { QuestionDifficulty } from '../../models/enums/questionDifficulty.enum';
import { QuestionType } from '../../models/enums/questionType.enum';
import { NgFor } from '@angular/common';
import { EventsService } from '../../services/eventsService/events.service';
import { QuestionService } from '../../services/questionService/question.service';
import { AssessmentService } from '../../services/assesmentService/assessment.service';
import { AssessmentForm } from '../../models/interfaces/assessmentForm.interface';

@Component({
  selector: 'app-assessment-create-page',
  imports: [
    DragDropModule,
    NgFor
  ],
  templateUrl: './assessment-create-page.component.html',
  styleUrl: './assessment-create-page.component.scss'
})
export class AssessmentCreatePageComponent implements OnInit{
  availableQuestions: Question[] = [
    {
      id: '1',
      text: '¿Qué es JavaScript?',
      type: QuestionType.open,
      answer: 'JavaScript',
      difficulty: QuestionDifficulty.easy,
      category: QuestionCategory.javascript
    },
    {
      id: '2',
      text: '¿Qué es Node.js?',
      type: QuestionType.open,
      answer: 'Node.js',
      difficulty: QuestionDifficulty.medium,
      category: QuestionCategory.nodeJs
    }
  ];

  questionsResponse: Question[] = [];

  assessmentQuestions: Question[] = [];

  constructor(
    private readonly eventsService: EventsService,
    private readonly questionService: QuestionService,
    private readonly assessmentService: AssessmentService
  ){

  }

  ngOnInit(){
    this.questionService.getAllQuestions()
    .then((response: Question[]) => {
      console.log('RESPONSE FROM PAGE', response);
      this.questionsResponse = response;
    })
    .catch((err: any) => {
      this.eventsService.openModal({
        open: true,
        title: 'Ups!, estamos presentando problemas',
        description: 'Por favor intentarlo dentro de unos minutos'
      });
    });
  }

  drop(event: CdkDragDrop<Question[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    }
  }
  handleClickSave(){
    const selectedQuestionsIds = this.assessmentQuestions
      .map(question => question.id)
      .filter((id): id is string => id !== undefined);

    console.log(selectedQuestionsIds);

    const body: AssessmentForm = {
      questions: selectedQuestionsIds
    };

    this.assessmentService.registryAssessment(body)
    .then((response: any)=> {
      console.log(response);
      //TODO AGREGAR UUID CON URL PARA COMPLETAR PRUEBA
      this.eventsService.openModal({
        open: true,
        title: 'Proceso completado',
        description: 'Se ha guardado la prueba de manera satisfactoria.'
      });
    })
    .catch((error: any) => {
      this.eventsService.openModal({
        open: true,
        title: 'Ups! estamos presentando problemas tecnicos',
        description: 'Por favor intentalo de nuevo mas tarde.'
      });
    });

  }


}
