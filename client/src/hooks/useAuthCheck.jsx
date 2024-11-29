import { toast } from "react-toastify";

const useAuthCheck = () => {
  const validateLogin = () => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in", { position: "bottom-right" });
      return false;
    }
    return true;
  };

  return {
    validateLogin,
  };
};

export default useAuthCheck;
