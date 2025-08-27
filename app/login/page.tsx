"use client";

import { GoogleButton } from "../../components/GoogleButton";
import { signInWithOAuth } from "@/utils/auth/oauth-signup";

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Center,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

import { userLogin } from "@/utils/auth/user-login";

export default function Page() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            email: "", 
            password: "",
            terms: true 
        },
        validate: (values) => {
            const errors: {[key: string]: string} = {};
            if (!/^\S+@\S+$/.test(values.email)) {
                errors.email = "Invalid email";
              }
            if (values.password.length < 6) {
                errors.password = "Password should include at least 6 characters";
            }
        
              return errors;
            },
    })

    const handleLogin = async (values: {
        email: string, 
        password: string,
        
    }) => {
        const { error } = await userLogin(
            values.email, 
            values.password, 
            router
        );
        if (error) {
          notifications.show({
            title: "Login Failed",
            message: error,
            color: "red",
          });
        } 
      };
      const handleGoogleLogin = async () => {
        const error = await signInWithOAuth();
        if (error) {
          notifications.show({
            title: "Google Login Failed",
            message: error,
            color: "red",
          });
        }
      }
      

    return (
    <Center mih="100vh">
      <Paper maw={560} w="100%" radius="md" p="5vw" m="5vw" withBorder>
        <Text size="50px" fw={500} mb="37">
          Log in
        </Text>
        <form onSubmit={form.onSubmit(handleLogin)}>
          <Stack>
            
              <TextInput
                required
                label="Email"
                placeholder="email@provider.com"
                withAsterisk
                {...form.getInputProps("email")}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                withAsterisk
                {...form.getInputProps("password")}
              />
           
            <Button variant="filled" type="submit" radius="xl" mt="md">
              Login with Email
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
              onClick={() => router.push("/signup")}
            >
              Don't have an account? Sign-up here
          </Anchor>
        </Stack>
      </Paper>
    </Center>
  );
}