import { NumberInput, TextInput } from "@mantine/core";
import type { Question } from "../../types/question.type";

interface WizardQuestionProps {
    inputKey: string;
    question: Question;
    value?: string | number;
    onChange?: ((value: string | number) => void) | React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    error?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    readOnly?: boolean;
}

export function WizardQuestion({
    inputKey,
    question,
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    disabled,
    required,
    placeholder,
    readOnly,
}: WizardQuestionProps) {
    const baseProps = {
        label: question.title,
        description: question.description,
        withAsterisk: !!question.validationRule,
        value,
        onFocus,
        onBlur,
        error,
        disabled,
        required,
        placeholder,
        readOnly,
    };

    switch (question.type) {
        case 'text':
        case 'email':
            return (
                <TextInput
                    key={inputKey}
                    {...baseProps}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement> | undefined}
                    type={question.type === 'email' ? 'email' : 'text'}
                />
            );
        case 'number':
            return (
                <NumberInput
                    key={inputKey}
                    {...baseProps}
                    onChange={onChange as ((value: string | number) => void) | undefined}
                />
            );
        default:
            console.warn(`Unsupported question type: ${question.type}`);
            return (
                <TextInput
                    key={inputKey}
                    {...baseProps}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement> | undefined}
                />
            );
    }
}