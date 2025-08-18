import { NextResponse } from "next/server";
import { createServerSideClient } from "@/supabase/server"; 

// retrieve all passwords for logged-in user
export async function GET() {
  const supabase = await createServerSideClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // gets all the rows that has specific user id 
  const { data, error } = await supabase
    .from("passwords")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // returns all the user-specific passwords
  return NextResponse.json(data);
}

// add a new password entry
export async function POST(req: Request) {
  const supabase = await createServerSideClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { place_name, address, password } = await req.json();
  
  // inserts a new row with user id along with place + password
  const { data, error } = await supabase
    .from("passwords")
    .insert({
      user_id: session.user.id,
      place_name,
      address,
      password,
    })
    .select(); 

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // returns added entry 
  return NextResponse.json(data[0]);
}