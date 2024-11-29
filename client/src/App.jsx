import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import Contact from "./components/Contact/Contact";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup";

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  useEffect(() => {
    // Check for token in localStorage on app load
    const token = localStorage.getItem("token");
    if (token) {
      setUserDetails((prev) => ({ ...prev, token }));
    }
  }, []);

  const isAuthenticated = !!userDetails.token;

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Conditional Routing */}
              {isAuthenticated ? (
                <Route element={<Layout />}>
                  <Route path="/" element={<Website />} />
                  <Route path="/properties">
                    <Route index element={<Properties />} />
                    
                  </Route>
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/favourites" element={<Favourites />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/property" element={<Property />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              )}
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
