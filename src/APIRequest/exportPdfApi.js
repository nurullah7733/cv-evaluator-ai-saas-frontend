export const exportPdfRequest = async (analysisId, token) => {
  try {
    let url = `${import.meta.env.VITE_API_URL}/export-pdf/${analysisId}`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/pdf",
      },
    });
    console.log(analysisId, "res");

    // ❌ HTTP Error Check
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData?.error || errorData?.message || `HTTP Error: ${res.status}`
      );
    }

    // ❌ Content-Type Validation
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/pdf")) {
      throw new Error("Invalid response format: Expected PDF");
    }

    // ❌ Blob Validation
    const blob = await res.blob();
    if (!blob || blob.size === 0) {
      throw new Error("Empty PDF received");
    }

    // ✅ Success
    return { success: true, data: blob };
  } catch (error) {
    console.error("PDF Export Error:", error);
    return {
      success: false,
      error: error.message || "Failed to export PDF",
    };
  }
};
