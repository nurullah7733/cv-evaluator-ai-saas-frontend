import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { setUserData, setIsProUser } from "../lib/sessionHelper/sessionHelper";

export default function AppInitCreateUserInAPI() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    (async () => {
      try {
        const token = await getToken();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/create-user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to create or fetch user");

        const data = await res.json();
        const user = Array.isArray(data.data) ? data.data[0] : data.data;

        setUserData(user);

        let isPro = false;
        if (user?.subscription?.status === "active") {
          const now = new Date();
          const end = new Date(user.subscription.currentPeriodEnd);
          if (end > now) {
            isPro = true;
          }
        }

        setIsProUser(isPro);
      } catch (error) {
        console.error("User init failed:", error);
        setUserData({});
        setIsProUser(false);
      }
    })();
  }, [isLoaded, isSignedIn, getToken]);

  return null;
}
