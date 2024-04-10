import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesService } from './quizzes.service';
import { Router } from '@angular/router';
import { QuizData } from '../../models/QuizData';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent implements OnInit {
  quizzes: QuizData[] = [];

  constructor(
    private quizzesService: QuizzesService,
    private quizService: QuizService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((data: QuizData[]) => {
      this.quizzes = data;
    })
  }

  startQuiz(id: number): void {
    this.quizzesService.quizId = id;
    this.quizzesService.step = 0;
    this.router.navigate([`quizzes/${this.quizzesService.quizId }/${this.quizzesService.step + 1}`]);
  }
}
