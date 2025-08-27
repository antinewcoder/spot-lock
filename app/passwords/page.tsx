"use client";

import { useEffect, useState } from "react";
import createClient from "../../supabase/client";
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";
import { PasswordEntry } from "../types/password";
import PasswordListCard from "../../components/PasswordListCard";
import FormModal from "../../components/FormModal";
import { InputValues } from "../types/password";


export default function PasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();


  
  const isAdding = searchParams.get("modal") === "new";
  const selectedId = searchParams.get("id");
  const showModal = isAdding || !!selectedId;
  
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  // clean the URL 
  useEffect(() => {
    if (searchParams.has("code")){
      router.replace(pathname);
    }

  },[]);

  useEffect(() => {
    async function fetchPasswords() {
      try {
        // retrieve the session
        const { data: { session }, error } = await supabase.auth.getSession();

        console.log("Session:", session);
        
        if ( error || !session) {
          console.log("Can not retrieve session. Redirect to login.");
          router.push("/login");
          return;
        }

        const response = await fetch("/api/passwords");
        if (!response.ok){
          throw new Error("fetch failed");
        }
        // fetch all the passwords for intial load
        const data = await response.json();
        console.log("Fetched passwords:", data);
        setPasswords(data ? data : []);
      } catch (error) {
        console.error("Can not fetch passwords:", error);
      } finally {
      setLoading(false);
      }
    }
    fetchPasswords();
  }, []);

  if (loading) 
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loader" />
    </div>
  );
  
  // need a get method?
  const selectedPassword: PasswordEntry | undefined =
  passwords.find(password => password.id === selectedId); 

  const initialValues: InputValues | undefined = selectedPassword ? {
      place_name: selectedPassword.place_name,
      place_address: selectedPassword.place_address,
      wifi_name: selectedPassword.wifi_name,
      password: selectedPassword.password,
  } : undefined;
 
  async function handleSave(values : InputValues){
    setSaving(true);
    if (isAdding){
      // posting a new entry
      const response = await fetch("/api/passwords", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)}
      );
      if (response.ok){
        const newPassword = await response.json();
        setPasswords((prev) => [...prev, newPassword])
        router.push("/passwords");
      } else {
        const error = await response.json();
        console.error("Failed to add new password:", error);
        // add notification
      }
    } else {
      // updating existing entry
      const response = await fetch(`/api/passwords/${selectedId}`, {
        method: "PATCH", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)}
      );
      if (response.ok){
        const updatedPassword = await response.json();
        setPasswords((prev) => prev.map(password => password.id === selectedId ? updatedPassword : password));
        router.push("/passwords");
      } else {
        const error = await response.json();
        console.error("Failed to add new password:", error);
        // add notification
      }
      setSaving(false);
    }


  }
  function handleClose(){
    router.push("/passwords");
  }
  async function handleDelete(){
    const previousState = passwords;
    setPasswords((prev) => prev.filter(password => password.id !== selectedId));

    try {
      const response = await fetch(`/api/passwords/${selectedId}`, {
        method: "DELETE", 
        headers: {"Content-Type": "application/json"},
      });
      if (response.ok){
        router.push("/passwords");
      } else {
        throw new Error("Delete failed");
      }
    }
    catch (error){
      console.error("Failed to delete:", error);
      setPasswords(previousState);
    }
  }
  
  return (
    <div className="min-h-screen">
      <h1 className="text-white text-6xl font-bold text-center m-10 ">
        Vault
      </h1>
      <PasswordListCard items={passwords} />
      {showModal && (<FormModal 
        initialValues={initialValues} 
        onCancel={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
        saving={saving}
      />)
      }
     
    </div>
    
  );
}