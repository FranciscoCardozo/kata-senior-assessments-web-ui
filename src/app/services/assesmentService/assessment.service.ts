import { Injectable } from '@angular/core';
import config from '../../config';
import { AssessmentForm } from '../../models/interfaces/assessmentForm.interface';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor() { }

  public async registryAssessment(body: AssessmentForm): Promise<any> {
    const endpoint = `${config.assessmentsApiEndpoint}${config.serviceEndpoints.registryAssessment}`;
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  public async getAssessmentById(id: string): Promise<any>{
    const endpoint = `${config.assessmentsApiEndpoint}${config.serviceEndpoints.getAssessmentById}/${id}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  }
}
