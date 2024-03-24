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
  quizzes: QuizData[] = [];
  chosenQuiz!: QuizData;
  id: number | undefined;
  step: number = 0;
  selectedAnswer!: string; 
  selectedAnswers: Answer[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getQuizzes();
  }

  test() {
    console.log(this.selectedAnswer);
    this.refresh();
  }

  getQuizzes() {
    this.quizService.getQuizzes().subscribe((data: QuizData[]) => {
      this.quizzes = data;
      console.log(this.quizzes);
    })
  }

  getChosenQuiz(id: number) {
    if (this.quizzes) {
      const foundQuiz = this.quizzes.find(quiz => quiz.id === id);
  
      if (foundQuiz) {
        this.chosenQuiz = foundQuiz;
        console.log(this.chosenQuiz);
      } else {
        console.error(`Quiz with id ${id} not found.`);
      }
    } else {
      console.error(`Quizzes array is not defined.`);
    }
  }

  next() {
    if (this.step < this.quizzes[0].quizQuestionDTOs.length) {
      this.step++;
      this.refresh();
      console.log("ID: " + this.id);
      console.log("STEP: " + this.step);
      console.log("SELECTED ANSWER: " + this.selectedAnswer);
      this.changedPath();
    } else { 
      return;
    }

    console.log(this.step);
  }

  previous() {
    if (this.step > 0) {
      this.step--;
      console.log("ID: " + this.id);
      console.log("STEP: " + this.step);
      console.log("SELECTED ANSWER: " + this.selectedAnswer);
      this.changedPath();
    } else {
      return;
    }

    console.log(this.step);
  }

  cancel() {
    console.log("ID: " + this.id);
    console.log("STEP: " + this.step);
    console.log("SELECTED ANSWER: " + this.selectedAnswer);
    //ADD CLEARING ALL DATA
    //this.router.navigate(['/quizzes']);
  }

  submit() {

  }

  changeStep(step: number) {
    this.step = step;
    console.log(this.step);
  }

  changedPath() {
    this.router.navigate([`quizzes/${this.id}/${this.step + 1}`])
  }

  refresh() {
    this.selectedAnswers[this.step].question = this.chosenQuiz.quizQuestionDTOs[this.step].question;
    this.selectedAnswers[this.step].selectedAnswer = this.selectedAnswer;

    console.log("SELECTED ANSWERS OBJ");
    console.log(this.selectedAnswers);
  }
}
