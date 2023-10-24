import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import "./home.css";
import { Search } from "../components/SearchForm";
import { getRepos, getUser } from "../services/api";
import { Pagination } from "../components/Pagination";
import { UserInfo } from "../components/UserInfo";
import { FilterFields, RepoFilters } from "../components/RepoFilters";
import { RepoItem } from "../components/RepoItem";

const PER_PAGE = 20;

export function Home() {
  const [userName, setUserName] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<FilterFields["sort"]>("updated");
  const [query, setQuery] = useState<FilterFields["query"]>();

  const { data: userData, error: userError } = useQuery({
    queryKey: ["user", userName],
    queryFn: () => getUser(userName),
    enabled: !!userName,
  });

  const { data: repoData, isRefetching } = useQuery({
    queryKey: ["repos", userName, page, sort, query],
    queryFn: () =>
      getRepos({
        page: String(page),
        per_page: String(PER_PAGE),
        sort: sort,
        query: {
          user: userName,
          ...query,
        },
      }),
    enabled: !!userName,
    placeholderData: keepPreviousData,
  });

  const totalPages = repoData ? Math.ceil(repoData.total_count / PER_PAGE) : 0;

  return (
    <main className="home__wrapper">
      <h1 className="home__title">Search for GitHub repos</h1>
      <Search onSubmit={(data) => setUserName(data.userName)} />
      {userError && (
        <div role="alert">Sorry we could not find the user "{userName}"</div>
      )}
      {userData && (
        <UserInfo
          avatarUrl={userData.avatar_url}
          name={userData.name || ""}
          bio={userData.bio || ""}
          location={userData.location || "unknown"}
          followers={userData.followers}
          publicRepos={userData.public_repos}
        />
      )}
      {repoData && (
        <div className="home__repos">
          <RepoFilters
            onSubmit={(data) => {
              setSort(data.sort);
              setQuery(data.query);
            }}
          />
          <div className="home__reposList">
            {repoData.total_count ? (
              <>
                <p role="alert" id="page-count">
                  Showing page {page} of {totalPages}
                </p>
                <div style={{ display: "flex" }}>
                  <ul>
                    {repoData?.items?.map((repo) => (
                      <RepoItem
                        key={repo.id}
                        description={repo.description || ""}
                        forks={repo.forks}
                        isRefetching={isRefetching}
                        language={repo.language || ""}
                        license={repo.license?.spdx_id || ""}
                        name={repo.name}
                        stargazersCount={repo.stargazers_count}
                        topics={repo.topics}
                        updatedAt={repo.updated_at}
                        url={repo.html_url}
                      />
                    ))}
                  </ul>
                </div>
                <Pagination
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={(pageNumber) => setPage(pageNumber)}
                />
              </>
            ) : (
              <div role="alert">
                Sorry we could not find any repos matching your filters
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
