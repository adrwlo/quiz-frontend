import { Component } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizInfoComponent } from './quiz-info/quiz-info.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuizFormComponent, QuizInfoComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  constructor(
    public quizzesService: QuizzesService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.quizzesService.getQuizzes();
  }
}
