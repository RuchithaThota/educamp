import { useState, useEffect } from "react";
import { useShowToast } from "../useShowToast";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_PROFILE_URL } from "../../services/endpoints";
import { getRequest } from "../../services/api";

const useFetchProfile = () => {
  const { setUser, setIsAuth, setAuthType } = useAuthStore();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await getRequest(USER_PROFILE_URL);
        setUser(data);
      } catch (error: any) {
        showToast(error.response.data, "error");
        setIsAuth(false);
        setAuthType(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);
  return { loading };
};

export default useFetchProfile;
