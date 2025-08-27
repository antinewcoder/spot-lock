"use client"
import { PasswordEntry } from "../app/types/password";
import { Stack, Group, Paper, Divider } from "@mantine/core";
import Link from "next/link";

interface PasswordCardProps {
    item: PasswordEntry;
}

export default function PasswordCard({item}: PasswordCardProps) {
    return (
    <Link href={{pathname: "/passwords", query: {id: item.id}}} style={{ textDecoration: "none" }}>
        <Paper shadow="md"  withBorder  p="md" mx="xl" radius="md">
            <Group mb="xs">
                <strong>{item.place_name}</strong>
            </Group>
            <Divider my="xs"/>
            <Stack>
                <div><strong>Address: </strong> {item.place_address}</div>
                <div><strong>WiFi Name: </strong> {item.wifi_name}</div>
                <div><strong>Password: </strong> {item.password}</div>
            </Stack>
            
        </Paper>
    </Link>

    );
}