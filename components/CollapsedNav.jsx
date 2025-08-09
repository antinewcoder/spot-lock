export default function CollapseNav(){
    return (
    <div className="flex flex-col ">
        <nav>
        <Link href="/" className="font-bold text-l">
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
  
         
        <div className="">
        <Anchor
            component={Link}
            href="/login"
            underline="never"
        >
        Login
        </Anchor>
        </div>
    </div>
    )
}