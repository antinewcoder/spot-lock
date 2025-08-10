"use client";


import {

  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Center,
  Checkbox,
 
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
            firstName: "", 
            lastName: "",
            email: "", 
        },
    })
// connect the email sending to backend

    return (
    <Center mih="100vh">
      <Paper maw={560}  w="100%" radius="md" p="5vw" m="5vw" withBorder>
        <Text size="50px" fw={500} mb="37">
          Contact Us
        </Text>
        <form>
          <Stack>
            <Group grow>
              <TextInput
                required
                label="First Name"
                placeholder="First Name"
                withAsterisk
                {...form.getInputProps("firstName")}
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Last Name"
                withAsterisk
                {...form.getInputProps("lastName")}
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
              {...form.getInputProps("contact-content")}
            />
    

        <Button
            variant="light"
            component="a"
            href="mailto:cl4625@columbia.edu"
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