import React, { useState } from "react";
import { BASE_URL } from "../../constant/enviornment";
import axios from "axios";
import { useNavigate } from "react-router";
import { checkUserAuth } from "../../store/userAuthStore";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const checkAuth = checkUserAuth((state) => state.checkAuth);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(userData);

    const resp = await axios.post(`${BASE_URL}/auth_login`, userData, {
      withCredentials: true,
    });
    if (resp.data) {
      checkAuth();
    }
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6 flex justify-between items-center">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
