export interface PasswordEntry {
    id: string;
    place_name: string;
    place_address: string;
    wifi_name: string; 
    password: string;
    user_id: string;
  }

export type InputValues = Omit<PasswordEntry, "id" | "user_id">;