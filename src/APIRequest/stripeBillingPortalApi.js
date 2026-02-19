export const stripeBillingPortalApiRequest = async (token) => {
  let url = `${
    import.meta.env.VITE_API_URL
  }/stripe-create-billing-portal-session`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Clerk Auth Token
    },
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("There was an error stripe create billing portal session");
  }
  const data = await res.json();
  return data;
};
