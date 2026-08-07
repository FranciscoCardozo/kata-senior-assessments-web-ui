import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-assessment-response-page',
  imports: [NgIf],
  templateUrl: './assessment-response-page.component.html',
  styleUrl: './assessment-response-page.component.scss'
})
export class AssessmentResponsePageComponent implements OnInit {
  idAssessment!: string;

  validationFormObject = {
    id: {value: '', valid: false}
  }
  private readonly uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {

      const id = params.get('id');

      if (id && this.uuidRegex.test(id)) {
        this.idAssessment = id
        console.log('ID ENCONTRADO = ', id);
      } else {
        console.log('ID NO ENCONTRADO O UUID INVÁLIDO');
        // Crear uno nuevo o mostrar listado
      }
    });
  }

  validateInputHandler(event:any){
    const value = event.target.value;
    const isValidUuid = this.uuidRegex.test(value);
    this.validationFormObject.id.value = value;
    this.validationFormObject.id.valid = isValidUuid;

    console.log('UUID válido:', isValidUuid);
  }
}
