import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizData } from '../models/QuizData';
import { Rating } from '../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getQuizzes`);
  }

  addQuiz(quiz: QuizData): Observable<QuizData> {
    return this.http.post<QuizData>(`${this.baseUrl}/api/addQuiz`, quiz);
  }

  deleteQuiz(title: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/deleteQuiz/${title}`);
  }

  getRatings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getRatings`);
  }
}
