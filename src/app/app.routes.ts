import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { QuizzesComponent } from './views/quizzes/quizzes.component';
import { NewQuizComponent } from './views/new-quiz/new-quiz.component';
import { ScoresComponent } from './views/scores/scores.component';
import { QuizComponent } from './views/quizzes/quiz/quiz.component';
import { QuizGuard } from './views/quizzes/quiz/quiz.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quizzes', component: QuizzesComponent },
    { path: 'quiz', component: QuizComponent, canDeactivate: [QuizGuard] },
    { path: 'new-quiz', component: NewQuizComponent },
    { path: 'scores', component: ScoresComponent },
];
