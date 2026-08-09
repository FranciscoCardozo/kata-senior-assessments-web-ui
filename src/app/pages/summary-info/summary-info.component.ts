import { Component } from '@angular/core';
import { ResponseResult } from '../../models/interfaces/responseResult.interface';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-summary-info',
  imports: [NgForOf],
  templateUrl: './summary-info.component.html',
  styleUrl: './summary-info.component.scss'
})
export class SummaryInfoComponent {
  assessmentResult: ResponseResult[] = [];

  constructor(){
    const storageInfo = sessionStorage.getItem('assessmentResult');
    if (storageInfo){
      this.assessmentResult = JSON.parse(storageInfo) as ResponseResult[];
    }

  }
}
