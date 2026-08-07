import { Injectable } from '@angular/core';
import config from '../../config';
import { Question } from '../../models/interfaces/question.interface';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  public async getAllQuestions(): Promise<any>{
    const endpoint = `${config.assessmentsApiEndpoint}${config.serviceEndpoints.getAllQuestions}`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async registryQuestion(body: Question): Promise<any>{
    console.log('BODY PETICION: ', body);
    const endpoint = `${config.assessmentsApiEndpoint}${config.serviceEndpoints.registryQuestion}`;
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
}
