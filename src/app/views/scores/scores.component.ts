import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Rating } from '../../models/Rating';
import { CommonModule } from '@angular/common';
import { DateTimeFormatPipe } from '../../pipes/date-time-format.pipe';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule],
  providers: [DateTimeFormatPipe],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
})
export class ScoresComponent implements OnInit {
  ratings: Rating[] = [];
  filteredRatings: Rating[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getRatings().subscribe((data) => {
      this.ratings = data;
      this.filteredRatings = data;
    });
  }

  filter(event: any): void {
    const value = event.target.value;
   
    this.filteredRatings = this.ratings.filter((rating) => {
      return (
        rating.quizTitle.toLowerCase().includes(value)
      );
    });
  }
}
