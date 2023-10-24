import "./header.css";
import GitHubLogo from "../assets/github.svg";

export function Header() {
  return (
    <header className="header__wrapper">
      <h2>RepoSpy 🔎</h2>
      <a
        aria-label="RepoSpy GitHub page"
        className="header__logo"
        href="https://github.com/PeteLindsell/repo-spy"
        rel="noopener noreferrer"
        target="_blank"
      >
        <GitHubLogo />
      </a>
    </header>
  );
}
