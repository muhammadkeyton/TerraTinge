# TerraTinge

TerraTinge is a platform designed to streamline the software development process. Our mission is to provide clients with an easy-to-use platform for building mobile apps and web apps for their businesses, while also developing our own software solutions to address common societal problems.

## Purpose

The purpose of TerraTinge is twofold:
1. **Client-Centric Development**: We empower clients to be active participants in the development process of their apps. With TerraTinge, clients can easily make payments, reach out to us for support, and have ongoing access to their software code and hosting, ensuring long-term flexibility and ownership.
2. **Societal Solutions**: In addition to client projects, we focus on developing innovative software solutions to address societal challenges, fostering creativity and problem-solving in our development endeavors.

## Code Structure

The TerraTinge codebase is organized as follows:

- **app**: Contains all the application code.
  - **api**: Contains the NextAuth endpoint, Stripe payment API route, and webhook.
  - **authentication**: Handles authentication logic.
  - **careers**: Manages career-related functionalities.
  - **dashboard**: Contains dashboard-related components and logic.
  - **emailsent**: is just confirmation message when users request magic link login.
  - **error**: shows auth errors.
  - **firebase**: Contains Firebase-related code.
  - **lib**: Contains utility functions and libraries.
  - **newuser**: Manages new user functionalities.
  - **partnership**: Handles partnership-related functionalities.
  - **privacy**: Manages privacy-related functionalities.
  - **server-actions**: Contains server-side actions for data fetching and writing.
  - **terms**: Manages terms and conditions-related functionalities.
  - **ui**: Contains all UI components and code.

- **emails**: Contains React email templates.
- **public**: Contains public assets like photos.
- **auth.config.ts**: Contains NextAuth configuration and is used in the middleware. It is edge-compatible.
- **auth.ts**: Contains authentication logic.
- **middleware**: Uses `auth.config.ts` for authentication.
- **nextconfig.mjs**: Allows the use of remote images.
- **nextauth.d.ts**: Extends the type of NextAuth tokens and sessions.
- **tailwind.config.ts**: Contains Tailwind CSS configuration.

### Project Data Flow

Whenever we are writing or fetching data, we follow this flow:
1. Call a server action.
2. The server action calls the database.
3. Fetch data using server components.

## Languages and Tools Used

- **Next.js**: Framework for building server-rendered React applications.
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Material-UI**: React component library for faster and easier web development.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Stripe**: Payment processing platform.
- **Firebase**: Platform for building web and mobile applications.

## Contribution Guidelines

To ensure a smooth collaboration process, please follow these guidelines:

1. **Fork the Repository**: If you haven’t already, fork the TerraTinge repository on GitHub to your own account.
2. **Branching Strategy**: Create a new branch for each feature or bug fix you're working on. Branch names should be descriptive and prefixed with either "feature/" or "bugfix/". For example:
    ```bash
    git checkout -b feature/new-feature
    ```
3. **Code Style**: Follow the coding style guidelines of the project. Ensure your code is properly formatted and documented. All folder names and file names should be in lowercase, and if the name is too long, use kebab case (e.g., 'payment-provider'). When importing files, use the global '@', for example:
    ```javascript
    import { someFunction } from '@/app/some-folder/some-file.ts';
    ```
4. **Commit Messages**: Write clear and descriptive commit messages. Use imperative mood (e.g., "Add feature" instead of "Added feature").
5. **Pull Requests**: When you're ready to submit your changes, open a pull request from your feature branch to the `main` branch of the main repository.
6. **Review Process**: All pull requests will be reviewed by project maintainers. Be prepared to address any feedback or suggestions for improvement.
7. **Testing**: If applicable, ensure that your changes are adequately tested. Write unit tests or provide instructions for manual testing.

By contributing to TerraTinge and its other software development projects, you agree to abide by these guidelines.

## License

All rights reserved. Unauthorized use, distribution, or reproduction is prohibited.
