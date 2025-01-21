import { useFormContext } from "react-hook-form";

const FormStep3 = ({ prevStep }: { prevStep: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Degrees</h2>
      <div>
        <input {...register("schoolName")} placeholder="School's name" />
        {errors.schoolName && <p>{String(errors.schoolName.message)}</p>}
      </div>
      <div>
        <input {...register("degree")} placeholder="Degree" />
        {errors.degree && <p>{String(errors.degree.message)}</p>}
      </div>
      <button type="button" onClick={prevStep}>Previous</button>
      <button type="submit">Send</button>
    </div>
  );
};

export default FormStep3;
