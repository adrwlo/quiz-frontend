import { Component } from '@angular/core';

interface newQuizUploadFileInfo {
  success: string;
  error: string;
}

@Component({
  selector: 'app-new-quiz-upload',
  standalone: true,
  imports: [],
  templateUrl: './new-quiz-upload.component.html',
  styleUrl: './new-quiz-upload.component.scss'
})
export class NewQuizUploadComponent {
  isDisabled: boolean = true;

  uploadFileTxt(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      console.log("File content:", fileContent);
    };

    reader.onerror = () => {
      console.error("Error occurred while reading the file.");
    };

    if (file) {
      reader.readAsText(file);
    }
  }
}
