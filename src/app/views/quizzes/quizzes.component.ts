import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesService } from './quizzes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent {
  constructor(
    public quizzesService: QuizzesService,
    private router: Router,
  ) {}

  startQuiz(id: number) {
    this.quizzesService.step = 0;
    this.quizzesService.getChosenQuiz(id);
    this.router.navigate([`quizzes/${id}/${this.quizzesService.step + 1}`]);
  }
}
