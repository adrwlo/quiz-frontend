import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesService } from './quizzes.service';
import { QuizData } from '../../models/QuizData';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent {
  constructor( public quizzesService: QuizzesService ) {}
}
