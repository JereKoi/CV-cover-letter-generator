import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

const MultiStepForm = () => {
  const methods = useForm({
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

  const steps = [FormStep1, FormStep2, FormStep3];
  const StepComponent = steps[currentStep];

  const nextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: any) => {
    if (currentStep === steps.length - 1) {
      try {
        const response = await axios.post("https://example.com/api/form", data); // Placeholder endpoint
        console.log("Form submitted successfully:", response.data);
        alert("Form submitted successfully!");
        } catch (error) {
        console.error("Submission failed:", error);
        alert("Submission failed. Please check your connection or try again later.");
        }
    } else {
      nextStep();
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
