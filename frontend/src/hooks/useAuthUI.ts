import { useContext } from "react";
import { AuthUIContext } from "../context/AuthUIProvider";

export const useAuthUI = () => {
  return useContext(AuthUIContext);
};
