import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Question } from '../../models/interfaces/question.interface';
import { NgFor } from '@angular/common';
import { EventsService } from '../../services/eventsService/events.service';
import { QuestionService } from '../../services/questionService/question.service';
import { AssessmentService } from '../../services/assesmentService/assessment.service';
import { AssessmentForm } from '../../models/interfaces/assessmentForm.interface';
import config from '../../config';
import { QuestionsResponse } from '../../models/interfaces/questionResponse.interface';

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
    .then((response: QuestionsResponse) => {
      this.questionsResponse = response.questions;
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
      .map(question => {
        const questionData = question as Question & {
          _id?: string;
          questionId?: string;
        };

        return questionData.id ?? questionData._id ?? questionData.questionId;
      })
      .filter((id): id is string => Boolean(id));

    console.log(selectedQuestionsIds);

    const body: AssessmentForm = {
      questions: selectedQuestionsIds
    };

    this.assessmentService.registryAssessment(body)
    .then((response: { uuid: string })=> {
      console.log(response);
      const uuid = response.uuid;
      const finalUrl = `${config.url}/assessment/response?id=${uuid}`;
      this.eventsService.openModal({
        open: true,
        title: 'Assessment generado con exito.',
        description: `Recuerda ingresar al siguiente enlace para que alguien mas lo complete: ${finalUrl},
         o consultarlo con el siguiente id: ${uuid}`
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
