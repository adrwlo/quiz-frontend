import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Rating } from '../../models/Rating';
import { CommonModule } from '@angular/common';
import { DateTimeFormatPipe } from '../../pipes/date-time-format.pipe';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule, DateTimeFormatPipe],
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
  ratings: Rating[] = [];
  filteredRatings: Rating[] = [];
  paginatedRatings: Rating[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getRatings().subscribe((data) => {
      this.ratings = data;
      this.filteredRatings = this.ratings; 
      this.totalItems = this.ratings.length;
      this.updatePage();
    });
  }

  filter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value?.toLowerCase() || '';

    this.filteredRatings = this.ratings.filter((rating) =>
      rating.quizTitle.toLowerCase().includes(value)
    );

    this.totalItems = this.filteredRatings.length;
    this.currentPage = 1;
    this.updatePage();
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRatings = this.filteredRatings.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
}
