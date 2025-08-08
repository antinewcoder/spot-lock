"use client";

import Link from "next/link";
import { Burger, Paper, Container, Group, Anchor, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function NavBar(){
    const [opened, { toggle }] = useDisclosure();

    return (
        <Paper>
            <Container>
                <Group>
                <Anchor component={Link} href="/" underline="never">
                    Hello
                </Anchor>
                <Anchor component={Link} href="/chat" underline="never">
                    Chat
                </Anchor>
                <Anchor component={Link} href="/gpt" underline="never">
                GPT
                </Anchor>
                    
                </Group>
                <Group>
                    <Button>
                        Login
                    </Button>
                    <Button>
                        Subscribe
                    </Button>
                    <Burger />
                </Group>

            </Container>
        </Paper>
        

    );
}