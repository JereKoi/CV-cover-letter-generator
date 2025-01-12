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
          {...register("firstName", { required: "First name is required." })}
          placeholder="First Name"
        />
        {errors.firstName && <p>{String(errors.firstName.message)}</p>}
      </div>
      <div>
        <input
          {...register("lastName", { required: "Last name is required." })}
          placeholder="Last Name"
        />
        {errors.lastName && <p>{String(errors.lastName.message)}</p>}
      </div>
      <div>
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address.",
            },
          })}
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
