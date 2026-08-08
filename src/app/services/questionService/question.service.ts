import { Injectable } from '@angular/core';
import config from '../../config';
import { Question } from '../../models/interfaces/question.interface';
import { M } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  public async getAllQuestions(): Promise<Question[]> {
    const endpoint = `${config.assessmentsApiEndpoint}${config.serviceEndpoints.getAllQuestions}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('RESPONSE FROM SERVICE: ', response);
    return response.json();
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
