import { useState } from "react";
import { Search } from "./components/SearchForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRepos, getUser } from "./services/api";
import { Pagination } from "./components/Pagination";

const PER_PAGE = 20;

function App() {
  const [userName, setUserName] = useState("");
  const [page, setPage] = useState(1);

  const { data: userData } = useQuery({
    queryKey: ["user", userName],
    queryFn: () => getUser(userName),
    enabled: !!userName,
  });

  const { data: repoData, isRefetching } = useQuery({
    queryKey: ["repos", userName, page],
    queryFn: () =>
      getRepos(
        `q=user:${userName}+fork:true&sort=updated&order=desc`,
        page,
        PER_PAGE
      ),
    enabled: !!userName,
    placeholderData: keepPreviousData,
  });

  const totalPages = repoData ? Math.ceil(repoData.total_count / PER_PAGE) : 0;

  return (
    <main>
      <h1>Repo Spy 🔎</h1>
      <Search onSubmit={(data) => setUserName(data.userName)} />
      <h2>{userData?.name}</h2>
      {repoData?.total_count && (
        <div>
          <p role="alert" id="page-count">
            Showing page {page} of {totalPages}
          </p>
          <div style={{ display: "flex" }}>
            <ul>
              {repoData?.items?.map((repo) => (
                <li
                  key={repo.id}
                  style={{
                    listStyleType: "none",
                    border: "1px solid black",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "5px",
                    opacity: isRefetching ? 0.5 : 1,
                  }}
                >
                  <h3>{repo.name}</h3>
                  <p>{repo.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {repoData && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(pageNumber) => setPage(pageNumber)}
        />
      )}
    </main>
  );
}

export default App;
