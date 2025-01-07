import { useFormContext } from "react-hook-form";

const FormStep3 = ({ prevStep }: { prevStep: () => void }) => {
  const { register, handleSubmit } = useFormContext();

  return (
    <div>
      <h2>Degrees</h2>
      <div>
        <input {...register("schoolName", { required: "School name is required." })} placeholder="Oppilaitoksen nimi" />
      </div>
      <div>
        <input {...register("degree", { required: "Degree is required." })} placeholder="Tutkinto" />
      </div>
      <button type="button" onClick={prevStep}>Previous</button>
      <button type="submit">Send</button>
    </div>
  );
};

export default FormStep3;
