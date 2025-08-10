"use client"
import { Collapse, Anchor, } from "@mantine/core";
import Link from "next/link";
export default function CollapseNav({opened, ...props}){
    
    return (
    <Collapse in={opened} props>
        <nav className="flex flex-col items-center h-auto gap-4 p-4">
    
            <Anchor
                component={Link}
                href="/about"
                underline="never"
            >
            About
            </Anchor>
            <Anchor
                component={Link}
                href="/pricing"
                underline="never"
            >
            Pricing
            </Anchor>
            <Anchor
                component={Link}
                href="/contact"
                underline="never"
            >
            Contact Us
            </Anchor>
          
           
        </nav>
    </Collapse>
    )
}