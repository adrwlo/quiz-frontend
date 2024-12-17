import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizData } from '../models/QuizData';
import { RatingAdd } from '../models/RatingAdd';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/quizzes`);
  }

  addQuiz(quiz: QuizData): Observable<QuizData> {
    return this.http.post<QuizData>(`${this.baseUrl}/api/quiz`, quiz);
  }

  deleteQuiz(title: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/delete/${title}`);
  }

  getRatings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/ratings`);
  }

  addRating(rating: RatingAdd): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/rating`, rating);
  }
}
