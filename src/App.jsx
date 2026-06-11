import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(JSON.parse(JSON.stringify(userData))));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <div className="w-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8 w-full max-w-7xl mx-auto px-4">
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
