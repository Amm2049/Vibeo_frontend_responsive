import { createContext } from "react";
import { useContext } from "react";

export const AppContext = createContext();
export function useApp() {
  return useContext(AppContext);
}

export const apiUrl = import.meta.env.VITE_API;
