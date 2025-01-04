import { useFormContext } from "react-hook-form";

const FormStep1 = ({ nextStep }: { nextStep: () => void }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2>Henkilötiedot</h2>
      <div>
        <input {...register("firstName", { required: "Etunimi on pakollinen" })} placeholder="Etunimi" />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <input {...register("lastName", { required: "Sukunimi on pakollinen" })} placeholder="Sukunimi" />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <input {...register("email", { required: "Sähköposti on pakollinen", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Virheellinen sähköposti" } })} placeholder="Sähköposti" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <button type="submit">Seuraava</button>
    </div>
  );
};

export default FormStep1;
