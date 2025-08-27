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
            <Group justify="space-between" mx="xl">
                <p className="text-2xl" > Your Passwords</p>
                <Link href={{pathname: "/passwords", query: {modal: "new"}}}>
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
                <Paper shadow="md" withBorder p="md" mx="xl" radius="md">
                    <div className="text-center">
                    It's empty for now. Click the + button to grow your list.
                    </div>
                </Paper>

            ) : (
            
            <Stack>
                
                {items.map(
                    (password) => (
                        <PasswordCard key={password.id} item={password} />
                    ))
                }
               
            </Stack>
            )}
        </Stack>
    );
}


