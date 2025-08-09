"use client";

import Link from "next/link";
import { Burger, Anchor, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";



export default function NavBar(){
    const [opened, { toggle, close }] = useDisclosure(false);

    return (
        <header className="bg-white shadow-md m-5 rounded-xl w-full mx-5 my-5">
           
                {/* mobile responsive */}
                
                <div className="flex items-center justify-between md:hidden px-4 py-3">
                <Link
                    href="/"
                    className="font-bold text-lg "
                >
                    Spot Lock
                </Link>
                <Burger className="md:hidden" opened={opened} onClick={toggle} aria-label="Open menu" />
               
            </div>

       
        <div className="hidden md:flex items-center justify-between px-6 py-3 ">
          
          <nav className="flex gap-8">
                <Link
                    href="/"
                    className="font-bold"
                >
                    Spot Lock
                </Link>
            
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
  
         
        <div className="flex gap-8 items-center">
            <Anchor
                component={Link}
                href="/login"
                underline="never"
            >
            Login
            </Anchor>
            <Button component={Link} href="/subscribe">
              Get Started
            </Button>
            
          </div>
        </div>
    
       
      
      </header>
    );
}