import { useFormContext, useWatch } from "react-hook-form";

const FormStep1 = ({ nextStep }: { nextStep: () => void }) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const watchedValues = useWatch({ control });

  return (
    <div>
      <h2>Personal information</h2>
      <div>
        <input
          {...register("firstName", { required: "Etunimi on pakollinen" })}
          placeholder="Etunimi"
        />
        {errors.firstName && <p>{String(errors.firstName.message)}</p>}
      </div>
      <div>
        <input
          {...register("lastName", { required: "Sukunimi on pakollinen" })}
          placeholder="Sukunimi"
        />
        {errors.lastName && <p>{String(errors.lastName.message)}</p>}
      </div>
      <div>
        <input
          {...register("email", {
            required: "Sähköposti on pakollinen",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Virheellinen sähköposti",
            },
          })}
          placeholder="Sähköposti"
        />
        {errors.email && <p>{String(errors.email.message)}</p>}
        </div>
      <div>
        <p>Reaaliaikaiset arvot:</p>
        <ul>
          <li>Etunimi: {watchedValues.firstName || "Tyhjä"}</li>
          <li>Sukunimi: {watchedValues.lastName || "Tyhjä"}</li>
          <li>Sähköposti: {watchedValues.email || "Tyhjä"}</li>
        </ul>
      </div>
      <button type="submit">Seuraava</button>
    </div>
  );
};

export default FormStep1;
