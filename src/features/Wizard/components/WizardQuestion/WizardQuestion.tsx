import { Stack, Text, TextInput, Title } from "@mantine/core";
import type { Question } from "../../types/question.type";

interface WizardQuestionProps {
    inputKey: string;
    question: Question;
}

export function WizardQuestion({ inputKey, question, ...props }: WizardQuestionProps) {
    return (
        <Stack gap="md">
            <Title>{question.title}</Title>
            <Text>{question.description}</Text>
            <TextInput key={inputKey} label={question.title} description={question.description} {...props} />
        </Stack>
    )
}