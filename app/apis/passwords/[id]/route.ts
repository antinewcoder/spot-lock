import { NextResponse } from "next/server";
import { createServerSideClient } from "@/supabase/server";

// retrieve specific password by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerSideClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("passwords")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", session.user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Password not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// update specific password id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerSideClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { place_name, address, password } = await request.json();

  const { data, error } = await supabase
    .from("passwords")
    .update({
      place_name,
      address,
      password,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .eq("user_id", session.user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// remove password by id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerSideClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { error } = await supabase
    .from("passwords")
    .delete()
    .eq("id", params.id)
    .eq("user_id", session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Password was deleted" });
}