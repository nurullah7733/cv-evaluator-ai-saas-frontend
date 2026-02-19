class SessionHelper {
  setUserData(userdata) {
    localStorage.setItem("userData", JSON.stringify(userdata));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
  }
  setIsProUser(isProUser) {
    localStorage.setItem("isProUser", JSON.stringify(isProUser));
  }
  getIsProUser() {
    return JSON.parse(localStorage.getItem("isProUser"));
  }

  setResumeFormData(resumeFormData) {
    localStorage.setItem("resumeFormData", JSON.stringify(resumeFormData));
  }
  getResumeFormData() {
    return JSON.parse(localStorage.getItem("resumeFormData"));
  }

  setResumeFormDataOnlyForHomePage(resumeFormDataOnlyForHomePage) {
    localStorage.setItem(
      "resumeFormDataOnlyForHomePage",
      JSON.stringify(resumeFormDataOnlyForHomePage)
    );
  }
  getResumeFormDataOnlyForHomePage() {
    return JSON.parse(localStorage.getItem("resumeFormDataOnlyForHomePage"));
  }

  setAnalysisData(analysisData) {
    localStorage.setItem("analysisData", JSON.stringify(analysisData));
  }
  getAnalysisData() {
    return JSON.parse(localStorage.getItem("analysisData"));
  }

  fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  base64ToFile = (base64String, fileName = "resume.pdf") => {
    try {
      const arr = base64String.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], fileName, { type: mime });
    } catch (error) {
      console.error("Error converting base64 to file:", error);
      return null;
    }
  };
}

export const {
  setUserData,
  getUserData,
  getIsProUser,
  setIsProUser,
  getResumeFormData,
  setResumeFormData,
  getAnalysisData,
  setAnalysisData,
  base64ToFile,
  fileToBase64,
  getResumeFormDataOnlyForHomePage,
  setResumeFormDataOnlyForHomePage,
} = new SessionHelper();
