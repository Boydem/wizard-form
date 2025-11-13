import { NumberInput, Stack, Text, TextInput, Title } from "@mantine/core";
import type { Question } from "../../types/question.type";

interface WizardQuestionProps {
    inputKey: string;
    question: Question;
}

export function WizardQuestion({ inputKey, question, ...props }: WizardQuestionProps) {
    const Component = question.type === 'text' ? TextInput : NumberInput;
    return (
        <Stack gap="md">
            <Title>{question.title}</Title>
            <Text>{question.description}</Text>
            <Component key={inputKey} label={question.title} description={question.description} {...props} />
        </Stack>
    )
}