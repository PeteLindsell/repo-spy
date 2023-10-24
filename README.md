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
- husky: to run eslint and prettier on pre commit
- playwright: test the full application as the user uses it while allowing for refactoring of implementation details

### Continuos Integration

- Husky to run linting with eslint and formatting with prettier pre commit
- GitHub Actions to run Playwright tests on commits and PRs

### Continuos deployment

- Netlify to deploy the main branch to [repo-spy.netlify.app/](https://repo-spy.netlify.app/)

### Styling

Considered a component library like MUI which is great for quickly prototyping or styled components as I used in the component library I originally created and then lead the development on for Cancer Research [github.com/CRUKorg/cruk-react-components](https://github.com/CRUKorg/cruk-react-components#readme) but for the simplicity of this site decided to go for a lighter weight option of CSS Modules

### Framework

- React Vite

Considered Next.js which is great for lots of use cases but gave little value to this site which is hitting an external API

## TODO

- Stub api endpoints in tests to prevent testing somebody elses application and to give deterministic results
- Improve test coverage
- Refactor home page to reduce nesting
