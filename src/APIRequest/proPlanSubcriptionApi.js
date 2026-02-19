export const subscriptionApiRequest = async (priceId, token) => {
  let url = `${import.meta.env.VITE_API_URL}/stripe-create-checkout-session`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Clerk Auth Token
    },
    body: JSON.stringify({ priceId }),
  });
  if (!res.ok) {
    throw new Error("There was an error create checkout session");
  }
  const data = await res.json();
  return data;
};
