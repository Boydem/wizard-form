import { createFileRoute, Link } from '@tanstack/react-router'
import logo from '../logo.avif'
import { Button, Center, Image, Stack } from '@mantine/core'


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Center mih="100vh">
      <Stack gap="md" align="center">
        <Image src={logo} alt="logo" w={150} />
        <Button component={Link} to="/wizard">To the Wizard</Button>
      </Stack>
    </Center>
  )
}
