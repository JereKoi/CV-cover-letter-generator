import { useFormContext } from "react-hook-form";

const FormStep2 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2>Työkokemus</h2>
      <div>
        <input {...register("jobTitle", { required: "Työnimike on pakollinen" })} placeholder="Työnimike" />
        {errors.jobTitle && <p>{errors.jobTitle.message}</p>}
      </div>
      <div>
        <input {...register("companyName", { required: "Yrityksen nimi on pakollinen" })} placeholder="Yrityksen nimi" />
        {errors.companyName && <p>{errors.companyName.message}</p>}
      </div>
      <button type="button" onClick={prevStep}>Edellinen</button>
      <button type="submit">Seuraava</button>
    </div>
  );
};

export default FormStep2;
