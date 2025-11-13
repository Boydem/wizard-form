import type { Question } from "../types/question.type";
import { validationRules } from "./validation-schemas";

export const questions: Question[] = [
    {
        id: 'name',
        title: 'What is your name?',
        description: 'Please enter your name',
        validationRule: validationRules.required,
        intialValue: '',
    },
    {
        id: 'email',
        title: 'What is your email?',
        description: 'Please enter your email',
        validationRule: validationRules.required,
        intialValue: '',
    },
    {
        id: 'age',
        title: 'What is your age?',
        description: 'Please enter your age',
        validationRule: validationRules.required,
        intialValue: '',
    },
    {
        id: 'university',
        title: 'What is your university?',
        description: 'Please enter your university',
        validationRule: validationRules.required,
        skipConditions: [
            (answers) => Number(answers.age) <= 18,
        ],
        intialValue: '',
    },
    {
        id: 'degree',
        title: 'What is your degree?',
        description: 'Please enter your degree',
        validationRule: validationRules.required,
        skipConditions: [
            (answers) => !answers.university,
        ],  
        intialValue: '',
    },
    {
        id: 'about-me',
        title: 'What is your about yourself?',
        description: 'Please enter your about yourself',
        validationRule: validationRules.required,
        intialValue: '',
    },
]