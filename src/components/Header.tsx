import styles from "./header.module.css";
import GitHubLogo from "../assets/github.svg";

export function Header() {
  return (
    <header className={styles.wrapper}>
      <h2>RepoSpy 🔎</h2>
      <a
        aria-label="RepoSpy GitHub page"
        className={styles.logo}
        href="https://github.com/PeteLindsell/repo-spy"
        rel="noopener noreferrer"
        target="_blank"
      >
        <GitHubLogo />
      </a>
    </header>
  );
}
