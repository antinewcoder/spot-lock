"use client";

import { GoogleButton } from "../../components/GoogleButton";

import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Center,
  Checkbox,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import createUser from "@/utils/auth/create-user";
import { signInWithOAuth } from "@/utils/auth/oauth-signup";

export default function Page() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            firstName: "", 
            lastName: "",
            email: "", 
            password: "",
            confirmPassword: "",
            terms: false 
        },
        validate: (values) => {
            const errors: {[key: string]: string} = {};
            if (!/^\S+@\S+$/.test(values.email)) {
                errors.email = "Invalid email";
              }
        
              if (values.password.length < 6) {
                errors.password = "Password should include at least 6 characters";
              }
        
              if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Passwords do not match";
              }
        
              if (!values.terms) {
                errors.terms = "You must accept the terms and conditions";
              }
        
              return errors;
            },
    })

    const handleSubmit = async (values: {
        email: string, 
        password: string,
        firstName: string,
        lastName: string 
    }) => {
        const { error } = await createUser(
            values.email, 
            values.password, 
            values.firstName, 
            values.lastName
        );
        if (error) {
          notifications.show({
            title: "Sign-up Failed",
            message: error.message,
            color: "red",
          });
        } else {
          notifications.show({
            title: "Sign-up Successful",
            message: "Please log in with your new account.",
            color: "green",
          });
          router.push("/login");
        }
      };
      const handleGoogleLogin = async () => {
        const result = await signInWithOAuth();
        if (result?.error) {
          notifications.show({
            title: "Google Login Failed",
            message: result.error,
            color: "red",
          });
        }
      }

    return (
    <Center mih="100vh">
      <Paper maw={560} w="100%" radius="md" p="5vw" m="5vw" withBorder>
        <Text size="50px" fw={500} mb="37">
          Sign Up
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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

            <PasswordInput
              withAsterisk
              required
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              required
              label="Confirm Password"
              placeholder="Confirm Password"
              {...form.getInputProps("confirmPassword")}
            />

            <Checkbox
              label="I agree to the terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
              error={form.errors.terms}
            />

            <Button variant="filled" type="submit" radius="xl" mt="md">
              Sign Up
            </Button>
          </Stack>
        </form>

        <Divider label="OR" labelPosition="center" my="md" />

        

          <Stack w="100%" align="center" gap="md">
            <GoogleButton
              radius="xl"
              size="sm"
              fullWidth
              onClick={(event) => {
                event.preventDefault();
                void handleGoogleLogin();
              }}
            />

            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => router.push("/login")}
            >
              Have an account? Login here
          </Anchor>
        </Stack>
      </Paper>
    </Center>
  );
}