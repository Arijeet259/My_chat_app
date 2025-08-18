import React, { useEffect } from "react";
import { checkUserAuth } from "../../store/userAuthStore";
import { BASE_URL } from "../../constant/enviornment";
import axios from "axios";

const HomePage = () => {
  const authUser = checkUserAuth((state) => state.authUser);
  console.log(authUser);

  useEffect(async () => {
    const userResp = await axios.get(`${BASE_URL}/users`, {
      withCredentials: true,
    });

    console.log(userResp.data);
    

  }, []);

  return (
    <div id="container">
      <p>Hello from chat app</p>
    </div>
  );
};

export default HomePage;
