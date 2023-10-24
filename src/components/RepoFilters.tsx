import { useForm } from "react-hook-form";
import "./repoFilters.css";
import { GetReposParams } from "../services/api";

export type FilterFields = {
  sort: GetReposParams["sort"];
  query: {
    language: string;
    topic: string;
    name: string;
    license: string;
    mirror: string;
    template: string;
    archived: string;
  };
};

type RepoFiltersProps = {
  onSubmit: (data: FilterFields) => void;
};

export function RepoFilters({ onSubmit }: RepoFiltersProps) {
  const { register, handleSubmit } = useForm<FilterFields>({
    defaultValues: {
      sort: "updated",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          ...data,
          query: {
            ...data.query,
            mirror: data.query.mirror ? "true" : "",
            template: data.query.template ? "true" : "",
            archived: data.query.archived ? "true" : "",
          },
        })
      )}
      noValidate
      className="repo-filters__wrapper"
    >
      <h3>Filters</h3>
      <label>
        Language
        <input {...register("query.language")} />
      </label>

      <label>
        Topics
        <input {...register("query.topic")} />
      </label>

      <label>
        License
        <input {...register("query.license")} />
      </label>

      <label>
        Name
        <input {...register("query.name")} />
      </label>

      <label>
        Mirror
        <input {...register("query.mirror")} type="checkbox" />
      </label>

      <label>
        Template
        <input {...register("query.template")} type="checkbox" />
      </label>

      <label>
        Archived
        <input {...register("query.archived")} type="checkbox" />
      </label>

      <label>
        Sort by
        <select {...register("sort")}>
          <option value="updated">Updated</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="help-wanted-issues">Help wanted</option>
        </select>
      </label>

      <button>Update Filters</button>
    </form>
  );
}
