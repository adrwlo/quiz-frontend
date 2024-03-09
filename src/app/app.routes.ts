import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { QuizzesComponent } from './views/quizzes/quizzes.component';
import { NewQuizComponent } from './views/new-quiz/new-quiz.component';
import { ScoresComponent } from './views/scores/scores.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quizzes', component: QuizzesComponent },
    { path: 'new-quiz', component: NewQuizComponent },
    { path: 'scores', component: ScoresComponent },
];
