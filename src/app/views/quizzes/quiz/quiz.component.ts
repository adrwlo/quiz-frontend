import { Component } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { CommonModule } from '@angular/common';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizInfoComponent } from './quiz-info/quiz-info.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule, 
    QuizFormComponent, 
    QuizInfoComponent, 
    ModalComponent,
    ToastComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent  {
  constructor( public quizzesService: QuizzesService ) {}
}
