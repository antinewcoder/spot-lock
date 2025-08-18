"use client";

import { Collapse, Anchor, CollapseProps } from "@mantine/core";
import Link from "next/link";
import { ComponentProps } from "react";


interface CollapseNavProps {
  opened: boolean;
}

export default function CollapseNav({ opened }: CollapseNavProps) {
  return (
    <Collapse in={opened}>
      <nav className="flex flex-col items-center h-auto gap-4 p-4">
        <Anchor component={Link} href="/about" underline="never">
          About
        </Anchor>
        <Anchor component={Link} href="/pricing" underline="never">
          Pricing
        </Anchor>
        <Anchor component={Link} href="/contact" underline="never">
          Contact Us
        </Anchor>
      </nav>
    </Collapse>
  );
}