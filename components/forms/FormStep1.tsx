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
          {...register("firstName")}
          placeholder="First Name"
        />
        {errors.firstName && <p>{String(errors.firstName.message)}</p>}
      </div>
      <div>
        <input
          {...register("lastName")}
          placeholder="Last Name"
        />
        {errors.lastName && <p>{String(errors.lastName.message)}</p>}
      </div>
      <div>
        <input
          {...register("email")}
          placeholder="Email"
        />
        {errors.email && <p>{String(errors.email.message)}</p>}
      </div>
      <div>
        <p>Info given:</p>
        <ul>
          <li>First name: {watchedValues.firstName || "Empty"}</li>
          <li>Last name: {watchedValues.lastName || "Empty"}</li>
          <li>Email: {watchedValues.email || "Empty"}</li>
        </ul>
      </div>
      <button type="submit" onClick={nextStep}>Next</button>
    </div>
  );
};

export default FormStep1;
