import { NextResponse } from "next/server";
import { createServerSideClient } from "@/supabase/server"; 

export async function POST(req: Request) {
    const supabase = await createServerSideClient();

    const {data: {session}} = await supabase.auth.getSession();

    if (!session?.user){
        return NextResponse.json({error: "Not authenicated"}, {status : 401});
    }
    console.log("Session:", {session})

    const {first_name, last_name, email, message} = await req.json();

    const { error } = await supabase
    .from("contact")
    .insert({
        first_name, 
        last_name,
        email, 
        message 
    });

    if (error){
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}