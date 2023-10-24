import { useForm } from "react-hook-form";
import styles from "./SearchForm.module.css";

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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <label>
        GitHub user or organization name
        <input
          {...register("userName", { required: true })}
          type="search"
          className={styles.input}
        />
      </label>

      <button className={styles.submit}>Search</button>
    </form>
  );
}
