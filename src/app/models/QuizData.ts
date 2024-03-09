import { QuizQuestion } from "./QuizQuestion";

export interface QuizData {
    title: string;
    quizQuestionDTOs: QuizQuestion[];
}