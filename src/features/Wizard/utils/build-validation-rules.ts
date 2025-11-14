import type { Question, ValidationRule } from '../types/question.type';

export const buildValidationRules = (questions: Question[]) =>
    questions.reduce((acc, question) => {
        acc[question.id] = (value, values) =>
            question.skipConditions?.some(condition => condition(values || {}))
                ? null
                : question?.validationRule?.(value, values, question.id) || null;
        return acc;
    }, {} as Record<string, ValidationRule>);