import { Wizard } from '@/features/Wizard/components/Wizard/Wizard'
import { Center, Code, Divider, Stack, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { questions } from "@/features/Wizard/utils/questions";
import { useState } from 'react';

export const Route = createFileRoute('/wizard')({
    component: WizardPage,
})

function WizardPage() {
    const [answers, setAnswers] = useState<Record<string, any>>({})

    const handleSubmit = (values: Record<string, any>) => {
        setAnswers(values)
    }

    return <Center mih="100vh">
        <Stack gap="lg">
            <Stack gap="xs">
                <Title>Da Wizard</Title>
                <Text c='dimmed'>Please answer the questions below:</Text>
            </Stack>
            <Wizard questions={questions} onSubmit={handleSubmit} />
            <Divider />
            <Text c='dimmed'>Answers:</Text>
            <Code block>{JSON.stringify(answers, null, 2)}</Code>
        </Stack>
    </Center>
}
