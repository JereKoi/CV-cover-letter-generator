import { useFormContext } from "react-hook-form";

const FormStep2 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Work Experience</h2>
      <div>
        <input
          {...register("jobTitle")}
          placeholder="Job Title"
        />
        {errors.jobTitle && <p>{String(errors.jobTitle.message)}</p>}
      </div>
      <div>
        <input
          {...register("companyName")}
          placeholder="Company name"
        />
        {errors.companyName && <p>{String(errors.companyName.message)}</p>}
      </div>
      <button type="button" onClick={prevStep}>
        Previous
      </button>
      <button type="submit" onClick={nextStep}>Next</button>
    </div>
  );
};

export default FormStep2;
