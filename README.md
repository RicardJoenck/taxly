# Taxly

This is a simple project set up with **Vite**, **React**, and **TypeScript**. Below are the available commands you can run using your preferred package manager.

## Available Commands

### Development

- **`dev`**: Start the development server using Vite.
- **`test`**: Run tests using Vitest.
- **`test:coverage`**: Run tests with code coverage.
- **`lint`**: Lint the project using ESLint.
- **`build`**: Build the project with TypeScript and Vite.

## Structure

### `components`

Contains reusable UI components that can be used throughout the project. The `chakra` folder specifically has components created by the library itself in the form of snippets, no work was done on my part there

### `hooks`

Has custom hooks, at this time the only one was to encapsulate the busy work needed for react-query

### `mocks`

Contains files related to MSW setup & testing utils e.g. the wrapper file

### `pages`

Holds what I considered to be pages, at this point only the form and error page are present

### `services`

Contains Rest call for our service, fairly simple file which is meant to be used in tandom with the aforementioned hook.

### `utils`

Utility files, currently, only a simple file to format currencies and the bulk of the tax calculation are present here.

## Considerations

In the sake of time a couple things weren't built, but would be improvements that I would tackle next

- **.env** - Currently the application only queries the backend to an static URL, ideally it would use the information of .env files for each enviroment
- **i18n** - Didn't have time to address any internalization tooling
- **Income Input** - Currently it just formats to Dollar, this could be refactor to be dynamic based on the user
- **Testing** - I focused mainly on addressing the biggest cases, with the two test files we are already at 80ish percent coverage, but definitely would be a point I would revisit
- **Routing** - Considering the simplicity of the project I didn't add any routing at this stage, but it would definitely be something I would add in a normal production app e.g. react-router
- **Chakra** - I opted for Chakra UI, because I wanted to try something new and I heard great things about it in the past, but honestly speaking I wasn't a big fan of where they went with the new version and the whole snippet idea, I regret the decision a bit as I ended up wasting some time getting to know the tool rather than the assignment and polishing other sections, all in all it isn't bad, but would have liked to explore it with more time
