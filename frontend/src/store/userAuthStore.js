import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "../constant/enviornment";

const checkUserAuth = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  
  checkAuth: async () => {
    try {
      const checkResp = await axios.get(`${BASE_URL}/check`, {
        withCredentials: true,
      });
      set({ authUser: checkResp.data });
    } catch (error) {
      console.log("error checking auth or Unauthorized");
    }
  },
}));

export { checkUserAuth };
