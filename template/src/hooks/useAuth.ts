import { useContext } from "react";
import { AuthContext, UserContext } from "../context/AuthModuleProvider";

export default function useAuth() {
  return {
    ...useContext(AuthContext),
    ...useContext(UserContext)
  }
}
