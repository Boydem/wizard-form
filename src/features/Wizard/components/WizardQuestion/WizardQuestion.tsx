import { NumberInput, TextInput } from "@mantine/core";
import type { Question } from "../../types/question.type";
import { useMemo } from "react";

interface WizardQuestionProps {
    inputKey: string;
    question: Question;
}

export function WizardQuestion({ inputKey, question, ...props }: WizardQuestionProps) {
    const componentProps = useMemo(() => {
        return {
            ...props,
            label: question.title,
            description: question.description,
            withAsterisk: !!question.validationRule,
            type: question.type === 'email' ? 'email' : 'text',
        }
    }, [question, props]);

    switch (question.type) {
        case 'text':
        case 'email':
            return <TextInput key={inputKey} {...componentProps} />;
        case 'number':
            return <NumberInput key={inputKey} {...componentProps} type="tel" />;
        default:
            console.warn(`Unsupported question type: ${question.type}`);
            return <TextInput key={inputKey} {...componentProps} />;
    }
}