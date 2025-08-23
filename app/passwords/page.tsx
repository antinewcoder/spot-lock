"use client";

import { useEffect, useState } from "react";
import { Button, Modal, TextInput, Stack, Table, Group } from "@mantine/core";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";

interface PasswordEntry {
  id: string;
  place_name: string;
  address: string;
  password: string;
}

export default function PasswordList() {
  const supabase = createClient();
  const router = useRouter();
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [selected, setSelected] = useState<PasswordEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
     
      // get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Can not retrieve session:", error.message);
        setLoading(false);
        return;
      }

      if (!session) {
        console.log("No session was found. User must login.");
        router.push("/login");
        setLoading(false);
        return;
      }

      // fetch passwords for logged-in user
      const response = await fetch("/api/passwords");
      const data = await response.json();
      setPasswords(data || []);
      setLoading(false);
    }

    init();

  }, []);

  const handleOpen = (entry: PasswordEntry) => {
    setSelected(entry);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!selected) return;
    await fetch(`/api/passwords/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });
    setModalOpen(false);
    setPasswords((prev) =>
      prev.map((p) => (p.id === selected.id ? selected : p))
    );
  };

  const handleDelete = async () => {
    if (!selected) return;
    await fetch(`/api/passwords/${selected.id}`, { method: "DELETE" });
    setModalOpen(false);
    setPasswords((prev) => prev.filter((p) => p.id !== selected.id));
  };

  if (loading) return <p>Loading...</p>;
  if (!passwords.length) return <p>No passwords found or user not logged in.</p>;

  return (
    <>
      <Button onClick={() => setModalOpen(true)} style={{ float: "right" }}>
        Add Password
      </Button>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Place</th>
            <th>Address</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((p) => (
            <tr
              key={p.id}
              onClick={() => handleOpen(p)}
              style={{ cursor: "pointer" }}
            >
              <td>{p.place_name}</td>
              <td>{p.address}</td>
              <td>{p.password}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Edit Password">
        <Stack>
          <TextInput
            label="Place"
            value={selected?.place_name || ""}
            onChange={(e) =>
              selected && setSelected({ ...selected, place_name: e.currentTarget.value })
            }
          />
          <TextInput
            label="Address"
            value={selected?.address || ""}
            onChange={(e) =>
              selected && setSelected({ ...selected, address: e.currentTarget.value })
            }
          />
          <TextInput
            label="Password"
            value={selected?.password || ""}
            onChange={(e) =>
              selected && setSelected({ ...selected, password: e.currentTarget.value })
            }
          />
          <Group mt="md">
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}