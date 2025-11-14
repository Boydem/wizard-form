import type { Question } from "../types/question.type";
import { validationRules } from "./validation-rules";

export const questions: Question[] = [
    {
        id: 'name',
        title: 'What is your name?',
        description: 'Please enter your name',
        validationRule: validationRules.minLength(3, 'Name must be at least 3 characters'),
        initialValue: '',
        type: 'text',
    },
    {
        id: 'email',
        title: 'What is your email?',
        description: 'Please enter your email',
        validationRule: validationRules.validEmail(),
        initialValue: '',   
        type: 'email',
    },
    {
        id: 'age',
        title: 'What is your age?',
        description: 'Please enter your age',
        validationRule: validationRules.requiredNumber('Age must be a number'),
        initialValue: '',
        type: 'number',
    },
    {
        id: 'university',
        title: 'What is your university?',
        description: 'Please enter your university',
        validationRule: null, // optional field
        skipConditions: [
            (answers) => Number(answers.age) <= 18,
        ],
        initialValue: '',
        type: 'text',
    },
    {
        id: 'degree',
        title: 'What is your degree?',
        description: 'Please enter your degree',
        validationRule: validationRules.required(),
        skipConditions: [
            (answers) => !answers.university,
        ],  
        initialValue: '',
        type: 'text',
    },
    {
        id: 'about-me',
        title: 'What is your about yourself?',
        description: 'Please enter your about yourself',
        validationRule: validationRules.required(),
        initialValue: '',
        type: 'text',
    },
]