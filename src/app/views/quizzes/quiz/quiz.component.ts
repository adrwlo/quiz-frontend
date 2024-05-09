import { Component } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { CommonModule } from '@angular/common';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizInfoComponent } from './quiz-info/quiz-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuizFormComponent, QuizInfoComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent  {
  constructor( public quizzesService: QuizzesService, private router: Router ) {console.log('init constr')}
}
