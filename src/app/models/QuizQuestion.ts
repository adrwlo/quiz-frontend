import { AnswerOption } from "./AnswerOption";

export interface QuizQuestion {
    question: string;
    answerA: AnswerOption;
    answerB: AnswerOption;
    answerC: AnswerOption;
    answerD: AnswerOption;
    selectedAnswer: string
}