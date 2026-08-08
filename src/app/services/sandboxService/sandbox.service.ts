import { Injectable } from '@angular/core';
import config from '../../config';
import { SubmitRequestBody } from '../../models/interfaces/submitRequestBody.interface';

@Injectable({
  providedIn: 'root'
})
export class SandobxService {

  constructor() { }

  public async submitCode(body: SubmitRequestBody): Promise<any>{

    const endpoint = `${config.assessmentsApiEndpoint}${config.serviceEndpoints.submitCode}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return response.json();
  }
}
