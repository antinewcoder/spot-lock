import { Button, ButtonProps } from "@mantine/core";
import { MouseEventHandler } from "react";

interface GoogleButtonProps extends ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <g fill="none" fillRule="evenodd">
        <path d="M17.64 9.204c0-.638-.057-1.252-.164-1.84H9v3.48h4.84c-.208 1.12-.84 2.068-1.788 2.706v2.248h2.9c1.698-1.564 2.688-3.868 2.688-6.594z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.468-.806 5.957-2.202l-2.9-2.248c-.806.54-1.84.86-3.057.86-2.35 0-4.34-1.586-5.048-3.72H.957v2.34A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
        <path d="M3.952 10.69A5.41 5.41 0 0 1 3.66 9c0-.586.102-1.154.292-1.69V4.97H.957A8.997 8.997 0 0 0 0 9c0 1.47.352 2.856.957 4.03l2.995-2.34z" fill="#FBBC05"/>
        <path d="M9 3.58c1.32 0 2.51.454 3.444 1.346l2.583-2.583C13.464.894 11.43 0 9 0A8.997 8.997 0 0 0 .957 4.97l2.995 2.34C4.66 5.176 6.65 3.58 9 3.58z" fill="#EA4335"/>
      </g>
    </svg>
  );
}

export function GoogleButton({
  children = "Sign in with Google",
  ...props
}: GoogleButtonProps) {
  return (
    <Button
      aria-label="Sign in with Google"
      leftSection={<GoogleLogo />}
      radius="xl"
      fw={500}
      variant="default"
      styles={{
        root: {
          backgroundColor: "#fff",
          color: "#3c4043",
          border: "1px solid #dadce0",
          height: 40,
          paddingInline: 14,
          boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        },
        label: {
          whiteSpace: "nowrap",
        },
        section: {
          marginRight: 12,
        },
      }}
      onMouseDownCapture={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
      onMouseUpCapture={(e) => e.currentTarget.style.backgroundColor = "#fff"}
      {...props}
      classNames={{
        root: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#1a73e8]",
      }}
    >
      {children}
    </Button>
  );
}