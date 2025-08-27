"use client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from '@mantine/notifications';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      defaultColorScheme="light" 
      theme={{
        primaryColor: "blue", 
      }}
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
}
