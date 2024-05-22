import { Injectable } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizData } from '../../models/QuizData';
import { Router } from '@angular/router';
import { QuizQuestion } from '../../models/QuizQuestion';
import { AnswerOption } from '../../models/AnswerOption';
import { ModalService } from '../../components/modal/modal.service';
import { ToastService } from '../../components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService  {
  quizzes: QuizData[] = [];
  chosenQuiz: QuizData = {
    title: '',
    quizQuestionDTOs: [],
    isShuffledQuestions: false,
    isShuffledAnswers: false
  };
  ratingRequestBody: any;
  step: number = 1;
  quizId!: number;
  answerWarning: boolean = false;
  completionMode: boolean = false;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private modalService: ModalService,
    private toastService: ToastService
  ) {}

  getQuizzes() {
    this.quizService.getQuizzes().subscribe((quizzes: QuizData[]) => {
      this.quizzes = quizzes;
    })
  }

  startQuiz(id: number) {
    const filteredQuiz = this.quizzes.find(quiz => quiz.id === id);
    if (filteredQuiz) {
      this.chosenQuiz = filteredQuiz;
      this.chosenQuiz.quizQuestionDTOs.forEach(quiz => quiz.selectedAnswer = "");

      if(this.chosenQuiz.isShuffledQuestions) {
        this.shuffleQuestions();
      }

      if (this.chosenQuiz.isShuffledAnswers) {
        this.shuffleAllAnswers();
      }
    } 

    this.quizId = id;
    this.router.navigate(['quiz']);
  }

  shuffleQuestions() {
    this.chosenQuiz.quizQuestionDTOs = this.shuffleArray(this.chosenQuiz.quizQuestionDTOs);
  }

  shuffleAnswers(question: any) {
    const answersArray = ['answerA', 'answerB', 'answerC', 'answerD'];
    for (let i = answersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = question[answersArray[i]];
      question[answersArray[i]] = question[answersArray[j]];
      question[answersArray[j]] = temp;
    }
  }

  shuffleAllAnswers() {
    this.chosenQuiz.quizQuestionDTOs.forEach(question => {
      this.shuffleAnswers(question);
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = array.slice(); 
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; 
    }
    return newArray;
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

  openModal() {
    if (this.areAllAnswersSelected()) {
      this.modalService.showModal();
    } else {
      this.answerWarning = true;
    }
  }

  submit() {
    this.ratingRequestBody = {
      quizId: this.chosenQuiz.id!,
      quizTitle: this.chosenQuiz.title,
      maxPoints: this.chosenQuiz.quizQuestionDTOs.length,
      rating: this.calculateRating()
    };

    this.quizService.addRating(this.ratingRequestBody).subscribe(
      () => {
        this.toastService.showSuccessToast('The quiz has been successfully submitted.');
        this.modalService.hideModal();
        this.completionMode = true;
      },
      (error) => {
        this.toastService.showErrorToast('An error occurred while submitting the quiz.');
        this.modalService.hideModal();
      }
    );
  }

  areAllAnswersSelected(): boolean {
    for (const question of this.chosenQuiz.quizQuestionDTOs) {
        if (question.selectedAnswer === "") {
            return false; 
        }
    }
    return true; 
  }

  calculateRating(): number {
    let rating = 0;
    for (const question of this.chosenQuiz.quizQuestionDTOs) {
        let correctAnswerKey: keyof QuizQuestion | undefined;
        for (const key in question) {
            if (Object.prototype.hasOwnProperty.call(question, key)) {
                const potentialAnswer = question[key as keyof QuizQuestion];
                if (typeof potentialAnswer === 'object' && (potentialAnswer as AnswerOption)?.correctAnswer) {
                    correctAnswerKey = key as keyof QuizQuestion;
                    break;
                }
            }
        }

        if (correctAnswerKey && question.selectedAnswer === correctAnswerKey) {
            rating++;
        }
    }
    return rating;
  }

  changeStep(step: number) {
    this.answerWarning = false;
    this.step = step;
  }

  setDefaultValues() {
    this.chosenQuiz = {
      title: '',
      quizQuestionDTOs: [],
      isShuffledQuestions: false,
      isShuffledAnswers: false
    };
    this.ratingRequestBody = {
      quizId: null,
      quizTitle: null,
      maxPoints: null,
      rating: null
    };
    this.chosenQuiz.quizQuestionDTOs.forEach(quiz => quiz.selectedAnswer = "");
    this.completionMode = false;
    this.step = 1;
  }
}
