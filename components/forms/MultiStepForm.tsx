import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

const MultiStepForm = () => {
  const methods = useForm({ defaultValues: { firstName: "", lastName: "", email: "" } });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [FormStep1, FormStep2, FormStep3];
  const StepComponent = steps[currentStep];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data: any) => {
    if (currentStep === steps.length - 1) {
      console.log("Lomake lähetetty:", data);
    } else {
      nextStep();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepComponent nextStep={nextStep} prevStep={prevStep} />
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
