"use client"
import { PasswordEntry } from "../app/types/password";
import { Stack, Paper, ActionIcon, Group, Text} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import PasswordCard from "./PasswordCard";
import Link from "next/link";

interface PasswordListProps{
    items: PasswordEntry[];
  };


export default function PasswordListCard({items}: PasswordListProps) {

    return (
        <Stack>
            <Group justify="space-between">
                <Text fw={400}>Passwords</Text>
                <Link href="/passwords/new">
                    <ActionIcon
                        variant="filled"   
                        size="md"          
                        radius="md"       
                        
                    >
                    <IconPlus size={16} />
                    </ActionIcon>
                </Link>
            </Group>

            {items.length ===  0 ? (
                <Paper shadow="md" withBorder p="md">
                    It&apos;s empty for now. Click the + button to grow your list.
                </Paper>
            ) : (
            
            <Stack>
                {items.map(
                    (password) => (
                        <PasswordCard key={password.id} item={password} />
                    ))
                };
            </Stack>
            )};
        </Stack>
    );
}


