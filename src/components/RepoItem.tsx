import "./repoItem.css";

type RepoItemProps = {
  description: string;
  forks: number;
  isRefetching: boolean;
  language: string;
  license: string;
  name: string;
  stargazersCount: number;
  topics?: string[];
  updatedAt: string;
  url: string;
};

export function RepoItem({
  description,
  forks,
  isRefetching,
  language,
  license,
  name,
  stargazersCount,
  topics,
  updatedAt,
  url,
}: RepoItemProps) {
  const date = new Date(updatedAt);
  const dateString = new Intl.DateTimeFormat().format(date);

  return (
    <li
      className="repo-item__wrapper"
      style={{ opacity: isRefetching ? 0.3 : 1 }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h3>{name}</h3>
      </a>
      <p>{description}</p>
      <ul className="repo-item__topicList">
        {topics?.map((topic) => (
          <li key={topic} className="repo-item__topicItem">
            {topic}
          </li>
        ))}
      </ul>
      <dl className="repo-item__detailedList">
        <dt>🔤 Language:</dt>
        <dd className="repo-item__detail">{language}</dd>
        <dt>⭐️ Stars:</dt>
        <dd className="repo-item__detail">{stargazersCount}</dd>
        <dt>⚖️ License:</dt>
        <dd className="repo-item__detail">{license}</dd>
        <dt>🍴 Forked:</dt>
        <dd className="repo-item__detail">{forks}</dd>
        <dt>⏰ Updated:</dt>
        <dd className="repo-item__detail">{dateString}</dd>
      </dl>
    </li>
  );
}
