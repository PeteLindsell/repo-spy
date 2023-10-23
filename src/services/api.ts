import { Endpoints } from "@octokit/types";

const BASE_URL = "https://api.github.com";

type GetUserRes = Endpoints["GET /users/{username}"]["response"]["data"];

export const getUser = async (userName: string): Promise<GetUserRes> => {
  const res = await fetch(`${BASE_URL}/users/${userName}`);
  return res.json();
};

type GetReposRes = Endpoints["GET /search/repositories"]["response"]["data"];

export const getRepos = async (userName: string): Promise<GetReposRes> => {
  const res = await fetch(`${BASE_URL}/search/repositories?${userName}`);
  return res.json();
};
