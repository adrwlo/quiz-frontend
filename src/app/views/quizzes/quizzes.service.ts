import { Injectable } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizData } from '../../models/QuizData';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Answer {
  question: string,
  selectedAnswer: string,
}

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  quizzes: QuizData[] = [];
  chosenQuiz: QuizData = {
    title: '',
    quizQuestionDTOs: []
  };
  step: number = 1;
  quizId!: number;
  answerWarning: boolean = false;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {
    this.quizService.getQuizzes().subscribe((quizzes: QuizData[]) => {
      this.quizzes = quizzes;
    })
  }

  startQuiz(id: number) {
    const filteredQuiz = this.quizzes.find(quiz => quiz.id === id);
    if (filteredQuiz) {
      this.chosenQuiz = filteredQuiz;
      this.chosenQuiz.quizQuestionDTOs.forEach(quiz => quiz.selectedAnswer = "");
      console.log(filteredQuiz);
    } else {
      console.log(`Quiz o id ${id} nie został znaleziony.`);
    }

    this.quizId = id;
    //this.step = 1;
    this.router.navigate(['quiz']);
    //this.router.navigate([`quizzes/${this.quizId }/${this.step + 1}`]);
  }

  next() {
    if (this.step <= this.chosenQuiz.quizQuestionDTOs.length) {
      this.step++;
    } else { 
      return;
    }
  }

  previous() {
    if (this.step > 1) {
      this.answerWarning = false;
      this.step--;
    } else {
      return;
    }
  }

  cancel() {
  }

  submit() {
    if (this.areAllAnswersSelected()) {
      
    } else {
      this.answerWarning = true;
    }
  }

  areAllAnswersSelected(): boolean {
    for (const question of this.chosenQuiz.quizQuestionDTOs) {
        if (question.selectedAnswer === "") {
            return false; 
        }
    }
    return true; 
}

  changeStep(step: number) {
    this.answerWarning = false;
    this.step = step;
  }

  changedPath() {
    //this.router.navigate([`quizzes/${this.quizId}/${this.step + 1}`])
  }

  setDefaultValues() {
    this.chosenQuiz = {
      title: '',
      quizQuestionDTOs: []
    };
    this.chosenQuiz.quizQuestionDTOs.forEach(quiz => quiz.selectedAnswer = "");
    this.step = 1;
  }
}
