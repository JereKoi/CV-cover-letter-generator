import { useFormContext } from "react-hook-form";

const FormStep3 = ({ prevStep }: { prevStep: () => void }) => {
  const { register, handleSubmit } = useFormContext();

  return (
    <div>
      <h2>Koulutus</h2>
      <div>
        <input {...register("schoolName", { required: "Oppilaitoksen nimi on pakollinen" })} placeholder="Oppilaitoksen nimi" />
      </div>
      <div>
        <input {...register("degree", { required: "Tutkinto on pakollinen" })} placeholder="Tutkinto" />
      </div>
      <button type="button" onClick={prevStep}>Edellinen</button>
      <button type="submit">Lähetä</button>
    </div>
  );
};

export default FormStep3;
