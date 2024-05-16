import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesService } from './quizzes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent {
  constructor( public quizzesService: QuizzesService ) {}
}
