import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import formValidationSchema from "../../utils/validationSchema";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

const generatePDF = (data: any, setPdfUrl: (url: string | null) => void) => {
  const doc = new jsPDF();

  // Set PDF content
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(14);

  // Add title
  doc.text("Submitted Form Information", 20, 20);

  // Add form data
  const yStart = 30;
  const lineHeight = 10;
  let yPosition = yStart;

  Object.entries(data).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 20, yPosition);
    yPosition += lineHeight;
  });

  // Create PDF blob and URL
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Set PDF URL to state
  setPdfUrl(pdfUrl);
};

const MultiStepForm = () => {
  const storageKey = process.env.STORAGE_KEY || "defaultKey";

  const methods = useForm({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      companyName: "",
      schoolName: "",
      degree: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // PDF URL state

  const steps = [FormStep1, FormStep2, FormStep3];
  const StepComponent = steps[currentStep];
  const { watch, reset } = methods;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = JSON.parse(localStorage.getItem(storageKey) || "{}");
      reset(savedData);
    }
  }, [reset, storageKey]);

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

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 0, 0));

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/form", data);
      console.log("Form submitted successfully:", response.data);

      console.log(data);

      // Generate and display the PDF
      generatePDF(data, setPdfUrl);

      alert("Form submitted successfully!");
      localStorage.removeItem(storageKey);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 && error.response.data.errors) {
          // Backend error handling
          const backendErrors = error.response.data.errors;
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

      {/* Show PDF in iframe if URL exists */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="500px"
          style={{ border: "1px solid black", marginTop: "20px" }}
        ></iframe>
      )}
    </FormProvider>
  );
};

export default MultiStepForm;
