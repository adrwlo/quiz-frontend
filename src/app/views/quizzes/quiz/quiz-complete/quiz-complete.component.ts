import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzesService } from '../../quizzes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-complete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-complete.component.html',
  styleUrl: './quiz-complete.component.scss'
})
export class QuizCompleteComponent {

  constructor(public quizzesService: QuizzesService, private route: Router) {}

  protected goToScores() {
    this.route.navigate(['scores']);
  }
}
