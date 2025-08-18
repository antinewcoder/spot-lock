"use client";

import Link from "next/link";
import { Burger, Anchor, Button} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CollapsedNav from "./CollapsedNav"
import { usePathname } from "next/navigation";


export default function NavBar(){
    const [opened, { toggle }] = useDisclosure(false);
    const pathname = usePathname();
    const hideNavOn = ["/login", "/signup", "/passwords"];
    const shouldHide = hideNavOn.includes(pathname);

    if (shouldHide){
        return null;
    }

    return (
        <header className="bg-white shadow-md m-4 rounded-xl items-center">
           
                {/* mobile responsive 
                    if hamburger open show collapsed nav and toggle=onClick
                */
                }
                
                <div className="flex items-center justify-between md:hidden px-4 py-3">
                <Link
                    href="/"
                    className="font-bold text-lg "
                >
                    Spot Lock
                </Link>
                <Burger className="md:hidden ml-auto" opened={opened} onClick={toggle} aria-label="Open menu" />
                </div>
                <div className="md:hidden">
                    {opened && <CollapsedNav opened={opened} />}
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
            <Button component={Link} href="/signup">
              Get Started
            </Button>
            
          </div>
        </div>
      </header>
    );
}