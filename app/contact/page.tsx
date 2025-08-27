"use client";

import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Center,
 
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications"; 
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";


export default function Page() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
        first_name: "", 
        last_name: "",
        email: "", 
        message: ""
      },
    })
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    const response = await fetch('/api/contact', 
    {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form.values)});

    if (response.ok){
      notifications.show({
        title: "Success",
        message: "Your message was successfully sent! We will respond in 2-3 business days",
        color: "green"
      });
      form.reset();
    } else {
      notifications.show({
        title: "Failed to send", 
        message: "Your message was unable to send. Please try again.",
        color: "red"
      });
    }
  };

  return (
    <Center mih="100vh">
      <Paper maw={560}  w="100%" radius="md" p="5vw" m="5vw" withBorder>
        <Text size="50px" fw={500} mb="37">
          Contact Us
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Group grow>
              <TextInput
                required
                label="First Name"
                placeholder="First Name"
                withAsterisk
                {...form.getInputProps("first_name")}
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Last Name"
                withAsterisk
                {...form.getInputProps("last_name")}
              />
            </Group>

            <TextInput
              required
              label="Email"
              withAsterisk
              placeholder="email@provider.com"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              label="Message"
              withAsterisk
              placeholder="Please enter your message here"
              {...form.getInputProps("message")}
            />
    

        <Button
            type="submit"
            variant="light"
            className="mt-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Contact Us
        </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}