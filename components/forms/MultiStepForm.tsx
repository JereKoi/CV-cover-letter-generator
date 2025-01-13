import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

const MultiStepForm = () => {
  const storageKey = process.env.STORAGE_KEY || "defaultKey";
  const savedData = typeof window !== "undefined" 
  ? JSON.parse(localStorage.getItem(storageKey) || "{}")
  : {};


  const methods = useForm({
    defaultValues: {
      firstName: savedData.firstName || "",
      lastName: savedData.lastName || "",
      email: savedData.email || "",
      jobTitle: savedData.jobTitle || "",
      companyName: savedData.companyName || "",
      schoolName: savedData.schoolName || "",
      degree: savedData.degree || "",
    },
  });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [FormStep1, FormStep2, FormStep3];
  const StepComponent = steps[currentStep];
  const { watch, reset } = methods;

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(storageKey, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const nextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/form", data);
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");
      localStorage.removeItem(storageKey);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 && error.response.data.errors) {
          // Backend error handling
          const backendErrors = error.response.data.errors;
          // Setting error messages for each field
          Object.keys(backendErrors).forEach((field) => {
            methods.setError(
              field as
                | "firstName"
                | "lastName"
                | "email"
                | "jobTitle"
                | "companyName"
                | "schoolName"
                | "degree",
              {
                message: backendErrors[field][0],
              }
            );
          });
        } else {
          console.error("Submission failed:", error.message);
          alert(
            "Submission failed. Please check your connection or try again later."
          );
        }
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        {steps.map((_, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              width: "30px",
              height: "10px",
              margin: "0 5px",
              backgroundColor: index === currentStep ? "blue" : "gray",
            }}
          ></span>
        ))}
      </div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepComponent nextStep={nextStep} prevStep={prevStep} />
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
