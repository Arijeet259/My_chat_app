import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/login_page/login";
import Signup from "./components/signup_page/signUp";
import Navbar from "./common/Navbar";
import HomePage from "./components/Home/HomePage";
import { checkUserAuth } from "./store/userAuthStore";
import { useEffect } from "react";
function App() {
  const { authUser, checkAuth } = checkUserAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
