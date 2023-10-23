import { useState } from "react";
import { Search } from "./components/SearchForm";
import { useQuery } from "@tanstack/react-query";
import { getRepos, getUser } from "./services/api";

function App() {
  const [userName, setUserName] = useState("");

  const { data: userData } = useQuery({
    queryKey: ["user", userName],
    queryFn: () => getUser(userName),
    enabled: !!userName,
  });

  const { data: repoData } = useQuery({
    queryKey: ["repos", userName],
    queryFn: () =>
      getRepos(`q=user:${userName}+fork:true&sort=updated&order=desc`),
    enabled: !!userName,
  });

  return (
    <main>
      <h1>Repo Spy 🔎</h1>
      <Search onSubmit={(data) => setUserName(data.userName)} />
      <h2>{userData?.name}</h2>
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
              }}
            >
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
