import { Wizard } from '@/features/Wizard/components/Wizard/Wizard'
import { Center, Stack, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { questions } from "@/features/Wizard/utils/questions";

export const Route = createFileRoute('/wizard')({
    component: WizardPage,
})

function WizardPage() {
    const handleSubmit = (values: Record<string, any>) => {
        console.log('WizardPage', values)
    }

    return <Center mih="100vh">
        <Stack gap="md">
            <Title>Wizard</Title>
            <Wizard questions={questions} onSubmit={handleSubmit} />
        </Stack>
    </Center>
}
