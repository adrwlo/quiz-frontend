import { QuizQuestion } from "./QuizQuestion";

export interface QuizData {
    id: number;
    title: string;
    quizQuestionDTOs: QuizQuestion[];
}