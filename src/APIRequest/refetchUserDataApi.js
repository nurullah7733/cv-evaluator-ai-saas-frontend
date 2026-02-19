import { setUserData, setIsProUser } from "../lib/sessionHelper/sessionHelper";

export const reFetchUserData = async (token) => {
  const url = `${import.meta.env.VITE_API_URL}/me`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Clerk Auth Token
    },
  });

  if (!res.ok) {
    throw new Error("There was an error fetching user data");
  }

  const data = await res.json();

  const user = Array.isArray(data.data) ? data.data[0] : data.data;

  setUserData(user);

  let isPro = false;

  if (user?.subscription?.status === "active") {
    const now = new Date();
    const end = new Date(user.subscription.currentPeriodEnd);

    // যদি এখনো subscription valid থাকে
    if (end > now) {
      isPro = true;
    }
  }

  setIsProUser(isPro);

  return user;
};
