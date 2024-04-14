import { create } from "zustand";
import { User } from "../utils/types";
import { v4 as uuidVersion4 } from "uuid";
import config from "../config";

interface StoreState {
  users: User[];
  fetchUsers: () => Promise<User[]>;
  addUser: (user: User) => void;
}

const useStore = create<StoreState>((set) => ({
  users: [],

  fetchUsers: async () => {
    console.log(`${config.apiUrl}/users`);
    try {
      const response = await fetch(`${config.apiUrl}/users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      console.log(`${config.apiUrl}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      set({ users: data });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  addUser: async (user) => {
    try {
      const userId = uuidVersion4();
      const userWithId = { ...user, id: userId };

      const response = await fetch(`http://localhost:3001/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(user),
        body: JSON.stringify(userWithId),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },
}));

export default useStore;
