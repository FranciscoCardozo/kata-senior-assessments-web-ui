import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { EventsService } from '../../services/eventsService/events.service';
import { AssessmentService } from '../../services/assesmentService/assessment.service';
import { QuestionService } from '../../services/questionService/question.service';
import { Question } from '../../models/interfaces/question.interface';
import { EventManager } from '@angular/platform-browser';
import { SandboxComponent } from "../../components/sandbox/sandbox.component";
import { SandobxService } from '../../services/sandboxService/sandbox.service';
import { SubmitRequestBody } from '../../models/interfaces/submitRequestBody.interface';
import { LanguageId } from '../../models/enums/languageId.enum';

@Component({
  selector: 'app-assessment-response-page',
  imports: [NgIf, NgForOf, SandboxComponent],
  templateUrl: './assessment-response-page.component.html',
  styleUrl: './assessment-response-page.component.scss'
})
export class AssessmentResponsePageComponent implements OnInit {
  idAssessment!: string;
  assessmentRs!: any;
  questionsList!: any[];
  responseCode = '';
  filteredQuestions: Question[] = [];

  validationFormObject = {
    id: {value: '', valid: false}
  };

  responseResult: any = [];

  private readonly uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventsService: EventsService,
    private readonly assessmentService: AssessmentService,
    private readonly questionService: QuestionService,
    private readonly sandboxService: SandobxService
  ){}

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {

      const id = params.get('id');

      if (id && this.uuidRegex.test(id)) {
        this.idAssessment = id;
        this.getAssessmentQuestions();
      } else {
        console.log('ID NO ENCONTRADO O UUID INVÁLIDO');
      }
    });
  }


  getAssessmentQuestions(){
    Promise.all(
      [
        this.assessmentService.getAssessmentById(this.idAssessment),
        this.questionService.getAllQuestions()
      ]
    ).then(([assessmentRs, questionRs]) => {
      console.log('RES ASSESSMENT: ', assessmentRs, questionRs);
      this.assessmentRs = assessmentRs.assessment[0].questions;
      this.questionsList = questionRs.questions;
      console.log(this.assessmentRs, this.questionsList);
    })
    .catch((err: any) => {
      this.eventsService.openModal({
        open: true,
        title: 'Ups!, estamos presentando problemas para cargar tu assessment',
        description: 'Por favor intentarlo dentro de unos minutos'
      });
    })
    .finally(()=>{
      this.mapInfo();
    });
  }

  mapInfo() {
    this.filteredQuestions = this.questionsList.filter(
      question =>
        this.assessmentRs.includes(
          question.SK.replace('QUESTION#', '')
        )
    );
}

  validateInputHandler(event:any){
    const value = event.target.value;
    const isValidUuid = this.uuidRegex.test(value);
    this.validationFormObject.id.value = value;
    this.validationFormObject.id.valid = isValidUuid;

    console.log('UUID válido:', isValidUuid);
  }

  validateResponseHandler(event: any, question: Question){
      this.responseResult.push(
        {
          question: question.text,
          isValid: event.target.value === question.answer
        }
      );
  }

  sendCode(sourceCode: string, category: string){
    const reqBody: SubmitRequestBody = {
      languageId: LanguageId[category as keyof typeof LanguageId],
      sourceCode: sourceCode
    }

    this.sandboxService.submitCode(reqBody)
    .then((response: any)=>{
      this.responseCode = response.result.stderr? response.result.stderr:
        response.result.stdout;
    })
    .catch(() => {
      this.eventsService.openModal({
        open: true,
        title: 'Ups!, estamos presentando problemas en estos momentos',
        description: 'Por favor intentarlo dentro de unos minutos'
      });
    });
  }
}
