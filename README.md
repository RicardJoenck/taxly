# Taxly

This is a simple project set up with **Vite**, **React**, and **TypeScript**. Below are the available commands you can run using your preferred package manager.

## Available Commands

### Development

- **`dev`**: Start the development server using Vite.
- **`test`**: Run tests using Vitest.
- **`test:coverage`**: Run tests with code coverage.
- **`lint`**: Lint the project using ESLint.
- **`build`**: Build the project with TypeScript and Vite.

## Considerations

In the sake of time a couple things weren't built, but would be improvements that I would tackle next

- **.env** - Currently the application only queries the backend to an static URL, ideally it would use the information of .env files for each enviroment
- **i18n** - Didn't have time to address any internalization tooling
- **Income Input** - Currently it just formats to Dollar, this could be refactor to be dynamic based on the user
- **Testing** - I focused mainly on addressing the biggest cases, with the two test files we are already at 80ish percent coverage, but definitely would be a point I would revisit
- **Chakra** - I opted for Chakra UI, because I wanted to try something new and I heard great things about it in the past, but honestly speaking I wasn't a big fan of where they went with the new version and the whole snippet idea, I regret the decision a bit as I ended up wasting some time getting to know the tool rather than the assignment and polishing other sections, all in all it isn't bad, but would have liked to explore it with more time
