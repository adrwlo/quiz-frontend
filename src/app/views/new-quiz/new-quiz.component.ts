import { Component } from '@angular/core';
import { NewQuizManuallyComponent } from './new-quiz-manually/new-quiz-manually.component';
import { NewQuizUploadComponent } from './new-quiz-upload/new-quiz-upload.component';

@Component({
  selector: 'app-new-quiz',
  standalone: true,
  imports: [
    NewQuizManuallyComponent,
    NewQuizUploadComponent
  ],
  templateUrl: './new-quiz.component.html',
  styleUrl: './new-quiz.component.scss'
})
export class NewQuizComponent {

}
