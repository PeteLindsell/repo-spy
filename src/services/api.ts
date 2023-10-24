import { Endpoints } from "@octokit/types";

const BASE_URL = "https://api.github.com";

type GetUserRes = Endpoints["GET /users/{username}"]["response"]["data"];

export const getUser = async (userName: string): Promise<GetUserRes> => {
  const res = await fetch(`${BASE_URL}/users/${userName}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

export type GetReposParams = Omit<
  Endpoints["GET /search/repositories"]["parameters"],
  "q" | "page" | "per_page"
> & {
  query: object;
  per_page: string;
  page: string;
};

export type GetReposRes =
  Endpoints["GET /search/repositories"]["response"]["data"];

export const getRepos = async ({
  query,
  ...params
}: GetReposParams): Promise<GetReposRes> => {
  const q = Object.entries({ template: "false", ...query }).reduce(
    (accumulator, current) => {
      if (current[1] === "") {
        return accumulator;
      }
      return `${accumulator}+${current[0]}:${current[1]}`;
    },
    "fork:true"
  );
  // Replace "%2B" with "+" because GitHub api will not accept encoding of "+" character
  const queryString = new URLSearchParams({ ...params, q })
    .toString()
    .replace(/%2B/g, "+");
  const res = await fetch(`${BASE_URL}/search/repositories?${queryString}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};
