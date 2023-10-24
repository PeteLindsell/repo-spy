import { useForm } from "react-hook-form";
import "./searchForm.css";

type SearchInputs = {
  userName: string;
};

type SearchProps = {
  onSubmit: (data: SearchInputs) => void;
};

export function Search({ onSubmit }: SearchProps) {
  const { register, handleSubmit } = useForm<SearchInputs>({
    defaultValues: { userName: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-form__wrapper">
      <label>
        GitHub user or organization name
        <input
          {...register("userName", { required: true })}
          type="search"
          className="search-form__input"
        />
      </label>

      <button className="search-form__submit">Search</button>
    </form>
  );
}
