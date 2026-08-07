import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Question } from '../../models/interfaces/question.interface';
import { QuestionCategory } from '../../models/enums/questionCategory.enum';
import { QuestionDifficulty } from '../../models/enums/questionDifficulty.enum';
import { QuestionType } from '../../models/enums/questionType.enum';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-assessment-create-page',
  imports: [
    DragDropModule,
    NgFor
  ],
  templateUrl: './assessment-create-page.component.html',
  styleUrl: './assessment-create-page.component.scss'
})
export class AssessmentCreatePageComponent {
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

  assessmentQuestions: Question[] = [];

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
    const selectedQuestionsIds = this.assessmentQuestions.map(
      question => question.id
    );
    console.log(selectedQuestionsIds);
  }


}
