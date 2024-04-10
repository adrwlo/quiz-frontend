import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { QuizzesService } from '../../quizzes.service';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';
import { QuizData } from '../../../../models/QuizData';
import { QuizQuestion } from '../../../../models/QuizQuestion';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss'
})
export class QuizFormComponent implements OnInit {
  id!: number;
  step!: number;

  chosenQuiz!: QuizData;

  answers: QuizQuestion[] =[];

  constructor(
    public quizzesService: QuizzesService,
    private quizService: QuizService,
    public route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.step = params['step'];

      console.log(this.id, this.step);

      this.loadQuiz();
    })
  }

  private loadQuiz(): void {
    this.quizService.getQuizzes().subscribe((quizzes: QuizData[]) => {
      if (quizzes) {
        const foundQuiz = quizzes.find(quiz => quiz.id == this.id);
  
        console.log(foundQuiz);
    
        if (foundQuiz) {
          this.chosenQuiz = foundQuiz;
        } else {
          console.error(`Quiz with id ${this.id} not found.`);
        }
      } else {
        console.error(`Quizzes array is not defined.`);
      }
    });
  }
}
