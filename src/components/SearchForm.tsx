import { useForm } from "react-hook-form";

type SearchInputs = {
  userName: string;
};

type SearchProps = {
  onSubmit: (data: SearchInputs) => void;
};

export function Search({ onSubmit }: SearchProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchInputs>({
    defaultValues: { userName: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        GitHub user or organization name
        <input {...register("userName", { required: true })} />
        {errors.userName && (
          <span role="alert">GitHub user or organization name is required</span>
        )}
      </label>

      <button>Find repos</button>
    </form>
  );
}
