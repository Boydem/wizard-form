import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useMemo, useState } from "react";

import type { Question } from "../../types/question.type";
import { useForm } from "@mantine/form";
import { buildValidationRules } from "../../utils/build-validation-rules";
import { buildInitialValues } from "../../utils/build-initial-values";
import { WizardQuestion } from "../WizardQuestion/WizardQuestion";

interface WizardProps {
    questions: Question[];
    onSubmit: (values: Record<string, any>) => void;
}

export function Wizard({ questions, onSubmit }: WizardProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

    const form = useForm<Record<string, any>>({
        mode: 'controlled',
        initialValues: buildInitialValues(questions),
        validate: buildValidationRules(questions),
    });

    const filteredQuestions = useMemo(() => questions.filter((question) => !question.skipConditions?.some((condition) => condition(form.values))), [questions, form.values])
    const currentQuestion = useMemo(() => filteredQuestions[currentQuestionIndex], [filteredQuestions, currentQuestionIndex]);
    const isLast = useMemo(() => currentQuestionIndex === filteredQuestions.length - 1, [currentQuestionIndex, filteredQuestions.length]);

    const handleNext = () => {
        const fieldValidation = form.validateField(currentQuestion.id);
        if (fieldValidation.hasError) {
            return;
        }

        if (isLast) {
            onSubmit(form.values)
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex === 0) return
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

    if (!filteredQuestions.length) {
        return <Text>No questions available</Text>
    }

    return <form onSubmit={(e) => {
        e.preventDefault();
        handleNext();
    }}>
        <Stack gap="lg" maw={'100%'} w={500}>
            <Paper withBorder p="md" radius="md" shadow="sm">
                <Stack gap="lg">
                    <WizardQuestion 
                        inputKey={form.key(currentQuestion.id)}
                        question={currentQuestion}
                        {...form.getInputProps(currentQuestion.id)}
                    />
                    <Group gap="md" w={'100%'} justify="space-between">
                        <Button variant="light" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</Button>
                        <Button type="submit">
                            {isLast ? 'Submit' : 'Next'}
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </Stack>
    </form>
}