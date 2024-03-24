import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from '../../quizzes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss'
})
export class QuizFormComponent {
  constructor(
    public quizzesService: QuizzesService,
    public route: ActivatedRoute
  ) {
    // this.route.params.subscribe(params => {
    //   this.quizzesService.id = params['id'];
    //   this.quizzesService.step = params['step'];
    // });

    console.log(this.quizzesService.step);
  }
  
}
