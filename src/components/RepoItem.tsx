import styles from "./RepoItem.module.css";

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
    <li className={styles.wrapper} style={{ opacity: isRefetching ? 0.3 : 1 }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h3>{name}</h3>
      </a>
      <p>{description}</p>
      <ul className={styles.topicList}>
        {topics?.map((topic) => (
          <li key={topic} className={styles.topicItem}>
            {topic}
          </li>
        ))}
      </ul>
      <dl className={styles.detailedList}>
        <dt>🔤 Language:</dt>
        <dd className={styles.detail}>{language}</dd>
        <dt>⭐️ Stars:</dt>
        <dd className={styles.detail}>{stargazersCount}</dd>
        <dt>⚖️ License:</dt>
        <dd className={styles.detail}>{license}</dd>
        <dt>🍴 Forked:</dt>
        <dd className={styles.detail}>{forks}</dd>
        <dt>⏰ Updated:</dt>
        <dd className={styles.detail}>{dateString}</dd>
      </dl>
    </li>
  );
}
