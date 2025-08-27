import { NextResponse } from "next/server";
import { createServerSideClient } from "@/supabase/server";

async function getIdFromPath(request: Request) {
  const url = new URL(request.url);
  const url_segments = url.pathname.split("/");
  return url_segments[url_segments.length - 1]; 
}

// retrieve a specific password by id
export async function GET(request: Request) {
  const id = await getIdFromPath(request);
  const supabase = await createServerSideClient();

  const { data: { session } } = await supabase.auth.getSession();
  console.log("Session:", session);

  if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data, error } = await supabase
    .from("passwords")
    .select("*")
    .eq("id", id)
    .eq("user_id", session.user.id)
    .single();

  if (error){
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data){
    return NextResponse.json({ error: "Password not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT to update a password
export async function PATCH(request: Request) {
  const id = await getIdFromPath(request);
  const supabase = await createServerSideClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  console.log("Session:", session);

  const { place_name, address, password } = await request.json();
  if (!place_name || !password) return NextResponse.json({ error: "place_name and password required" }, { status: 400 });

  const { data, error } = await supabase
    .from("passwords")
    .update({ place_name, address, password, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", session.user.id)
    .select()
    .single();

  if (error){
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data){
    return NextResponse.json({ error: "Password not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// remove selected password
export async function DELETE(request: Request) {
  const id = await getIdFromPath(request);
  const supabase = await createServerSideClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  console.log("Session:", session);

  const { error } = await supabase
    .from("passwords")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id);

    if (error){
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
  return NextResponse.json({ message: "Password was successfully deleted!" });
}