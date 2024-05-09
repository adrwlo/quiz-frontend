import { Component } from '@angular/core';
import { QuizzesService } from '../../quizzes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss'
})
export class QuizFormComponent {
  constructor( public quizzesService: QuizzesService ) {}

  chosenTest() {
    console.log(this.quizzesService.chosenQuiz);
  }
}
