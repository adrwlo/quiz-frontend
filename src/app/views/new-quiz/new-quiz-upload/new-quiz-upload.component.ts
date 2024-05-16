import { Component } from '@angular/core';
import { QuizData } from '../../../models/QuizData';
import { QuizQuestion } from '../../../models/QuizQuestion';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz.service';
import { ToastService } from '../../../components/toast/toast.service';
import { ToastComponent } from '../../../components/toast/toast.component';

interface MessageInfo {
  message: string;
  messageType: 'success' | 'danger';
}

@Component({
  selector: 'app-new-quiz-upload',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent
  ],
  templateUrl: './new-quiz-upload.component.html',
  styleUrl: './new-quiz-upload.component.scss'
})
export class NewQuizUploadComponent {
  isDisabled: boolean = true;
  showMessageInfo: boolean = false;
  messageInfo!: MessageInfo;

  quizTitles: string[] = [];
  quizQuestions: string[] = [];
  quizCorrectAnswers: string[] = [];
  quizNotCorrectAnswers: string[] = [];

  quizData!: QuizData;

  constructor(private quizService: QuizService, private toastService: ToastService) {}

  uploadFileTxt(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      this.parseQuizData(fileContent);
    };

    reader.onerror = () => {
      console.error("Error occurred while reading the file.");
    };

    if (file) {
      reader.readAsText(file);
    }
  }

  parseQuizData(fileContent: string) {
    const lines = fileContent.split('\n');

    lines.forEach((line) => {
      if (line.startsWith("#")) {
        this.quizTitles.push(line.substring(2));
      } else if (line.startsWith("==>")) {
        this.quizCorrectAnswers.push(line.substring(3))
      } else if (line.startsWith("==")) {
        this.quizNotCorrectAnswers.push(line.substring(2))
      } else if (line.startsWith("=")) {
        this.quizQuestions.push(line.substring(1));
      }
    });

    this.validQuizData();
  }

  validQuizData() {
    if (
      this.quizTitles.length === 1 &&
      this.quizQuestions.length >= 3 &&
      this.quizCorrectAnswers.length === this.quizQuestions.length && 
      this.quizQuestions.length * 3 === this.quizNotCorrectAnswers.length
    ) {
      this.isDisabled = false;
      this.showMessageInfo = true;
      this.messageInfo = { message: 'The file txt upload was successful!', messageType: 'success' };
      this.mergeParsedQuiz();
    } else {
      this.showMessageInfo = true;
      this.messageInfo = { message: 'There were problems with the uploaded file!!', messageType: 'danger' };
      this.clearQuizAfterParsing();
    }
  }

  clearQuizAfterParsing() {
    this.quizTitles = [];
    this.quizQuestions = [];
    this.quizCorrectAnswers = [];
    this.quizNotCorrectAnswers = [];
  }

  mergeParsedQuiz(): void {
    this.quizData = { 
      title: this.quizTitles[0], 
      quizQuestionDTOs: [],
      isShuffledQuestions: false,
      isShuffledAnswers: false
    };
  
    for (let i = 0; i < this.quizQuestions.length; i++) {
      const question: QuizQuestion = {
        question: this.quizQuestions[i], 
        answerA: { answer: this.quizNotCorrectAnswers[i * 3], correctAnswer: false },
        answerB: { answer: this.quizNotCorrectAnswers[i * 3 + 1], correctAnswer: false }, 
        answerC: { answer: this.quizNotCorrectAnswers[i * 3 + 2], correctAnswer: false }, 
        answerD: { answer: this.quizCorrectAnswers[i], correctAnswer: true },
        selectedAnswer: ""
      };
      
      this.quizData.quizQuestionDTOs.push(question);
    }
  }

  saveQuizData() {
    this.quizService.addQuiz(this.quizData).subscribe(
      (response) => {
        this.toastService.showSuccessToast('Quiz has been successfully added.');
        console.log(response);
      },
      (error) => {
        this.toastService.showErrorToast('An error occurred while adding the quiz.');
        console.log(error);
      })
  }
  
  downloadExampleQuizTxt() {
    const fileUrl = '../../../../assets/config.txt'; 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      const blob = new Blob([xhr.response], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'config.txt'; 
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    xhr.send();
  }
}
