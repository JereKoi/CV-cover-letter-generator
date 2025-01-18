const onSubmit = async (data: any) => {
    try {
      // Sanitize data
      const sanitizedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, sanitizeInput(value)])
      );
  
      const response = await axios.post("/api/form", sanitizedData);
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");
      localStorage.removeItem(storageKey);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 && error.response.data.errors) {
          const backendErrors = error.response.data.errors;
          Object.keys(backendErrors).forEach((field) => {
            methods.setError(field as keyof typeof data, {
              message: backendErrors[field][0],
            });
          });
        } else {
          console.error("Submission failed:", error.message);
          alert("Submission failed. Please try again later.");
        }
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };
  