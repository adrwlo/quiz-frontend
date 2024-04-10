import { Injectable } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizData } from '../../models/QuizData';
import { ActivatedRoute, Router } from '@angular/router';

interface Answer {
  question: string,
  selectedAnswer: string,
}

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  step: number = 0;
  quizId!: number;

  constructor(
    private router: Router,
  ) {}

  next() {
    if (this.step > 5) {
      this.step++;
   
      this.changedPath();
    } else { 
      return;
    }
  }

  previous() {
    if (this.step > 0) {
      this.step--;
      this.changedPath();
    } else {
      return;
    }
  }

  cancel() {
  }

  submit() {

  }

  changedPath() {
    this.router.navigate([`quizzes/${this.quizId}/${this.step + 1}`])
  }
}
