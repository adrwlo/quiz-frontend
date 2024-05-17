import { CanDeactivateFn } from '@angular/router';
import { QuizComponent  } from './quiz.component';

export const QuizGuard: CanDeactivateFn<QuizComponent> = (component, currentRoute, currentState, nextState) => {
  const quizzesService = component.quizzesService;

  if (!quizzesService.completionMode) {
    quizzesService.setDefaultValues();
    return confirm('Are you sure you want to leave this page? The filled quiz will be lost.');
  } else {
    return true; 
  }
};
