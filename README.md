# RepoSpy 🔎

Search GitHub user and organisations public repositories.

Demo site can be found at [repo-spy.netlify.app/](https://repo-spy.netlify.app/)

## Getting Started 🚀

Install dependencies:

```bash
npm i
```

Start development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

## Technical Decisions

### Local development

- eslint
- prettier
- husky
- playwright

### Continuos Integration

- Husky to run linting with eslint and formatting with prettier pre commit
- GitHub Actions to run Playwright tests on commits and PRs

### Continuos deployment

- Netlify to deploy the main branch to [repo-spy.netlify.app/](https://repo-spy.netlify.app/)

### Styling

Considered MUI which is great for quickly prototyping or ...

### React Framework

- React Vite

Considered Next.js which is great for lots of ... but gave little value to this site which is hitting an external API
