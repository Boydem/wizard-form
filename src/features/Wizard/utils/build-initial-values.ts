import type { Question } from "../types/question.type";

export const buildInitialValues = (questions: Question[]) =>
    questions.reduce((acc, question) => {
        acc[question.id] = question.initialValue || '';
        return acc;
    }, {} as Record<string, any>);