import { Component } from '@angular/core';
import { QuizzesService } from '../../quizzes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-info.component.html',
  styleUrl: './quiz-info.component.scss'
})
export class QuizInfoComponent {
  constructor(
    public quizzesService: QuizzesService
  ) {}
}
