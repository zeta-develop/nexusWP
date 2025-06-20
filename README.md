# Invoza CLI (@zeta-develop/invoxa-cli)

This CLI tool scaffolds a new Invoza project. It is published on GitHub Packages.

## Installation from GitHub Packages

To install this package from GitHub Packages, you or your users will need to configure npm to use the GitHub Packages registry for the `@zeta-develop` scope.

1.  **Authenticate to GitHub Packages:**
    Ensure you are authenticated to GitHub Packages. This usually involves having a Personal Access Token (PAT) with at least `read:packages` scope.

2.  **Configure `.npmrc`:**
    Add the following lines to your user-level `.npmrc` file (usually at `~/.npmrc`) or a project-level `.npmrc` file:
    ```
    @zeta-develop:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
    ```
    Replace `YOUR_GITHUB_PAT` with your GitHub Personal Access Token.

3.  **Install the package:**
    Now you can install the package:
    For global installation:
    ```bash
    npm install -g @zeta-develop/invoxa-cli
    ```
    Then, you can run the command (which is `invoxa` as defined in `package.json` `bin`):
    ```bash
    invoxa my-new-project
    ```
    To use with `npx` (this also requires the `.npmrc` configuration if the package is not yet cached or public on npmjs.org):
    ```bash
    npx @zeta-develop/invoxa-cli my-project-name
    ```

## Usage

To generate a new Invoza project, navigate to the directory where you want to create the project's parent folder and run:

If using `npx` (after configuring `.npmrc` as per installation):
```bash
npx @zeta-develop/invoxa-cli my-new-project
```

Or, if you have installed `@zeta-develop/invoxa-cli` globally (after configuring `.npmrc`):
```bash
invoxa my-new-project
```

This will create a new directory named `my-new-project` (or your chosen project name) inside the current directory, and copy the basic Invoza project template into it.

**Note:** The command will exit if a directory with the chosen project name already exists in the current location.

## Development (Testing Locally)

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url> # Replace <your-repo-url> with the actual URL
    cd invoxa-cli # The directory name of the cloned repo
    ```
2.  **Install dependencies for the CLI tool itself:**
    This step is crucial to install `fs-extra` and other dependencies.
    ```bash
    npm install
    ```
3.  **Link the package:**
    This makes the `invoxa` command (as defined in `package.json`'s `bin`) available globally on your system, pointing to your local project files.
    ```bash
    npm link
    ```
    Verify by typing `invoxa` in a new terminal tab/window; it should show the help message if no project name is provided, or version info.

4.  **Test the command:**
    Navigate to a *different* directory where you want to create your test project. For example:
    ```bash
    mkdir ../cli-test-projects
    cd ../cli-test-projects
    ```
    Now run the linked `invoxa` command with a project name:
    ```bash
    invoxa my-sample-app
    ```
    You should see a new directory `my-sample-app` created inside `../cli-test-projects`, containing the template files. Check its contents.

5.  **Making changes and re-testing:**
    If you make changes to `index.js` or other files in the `invoxa-cli` project, these changes are immediately live in your linked `invoxa` command because `npm link` creates a symbolic link. Simply re-run the command in your test directory.

6.  **Unlinking:**
    When you're done testing, you might want to remove the global link.
    From within the `invoxa-cli` project directory, run:
    ```bash
    npm unlink
    ```
    This removes the global link for `invoxa` that was pointing to this local project. If you also installed it globally for testing from a registry, you might need `npm uninstall -g @zeta-develop/invoxa-cli`.

## Publishing to GitHub Packages

This package is configured to be published to GitHub Packages under the `@zeta-develop` scope.

1.  **Authenticate with GitHub Packages:**
    You need to authenticate with npm using a Personal Access Token (PAT) that has the `read:packages` and `write:packages` scopes.
    ```bash
    npm login --registry=https://npm.pkg.github.com
    ```
    Enter your GitHub username and use the PAT as your password.

2.  **Publish the package:**
    Increment the version in `package.json` as needed (e.g., `npm version patch`).
    Then, publish the package using:
    ```bash
    npm publish
    ```
    Npm will use the `publishConfig` in `package.json` to route the package to GitHub Packages.

## Project Template

The generated project (e.g., `my-sample-app/`) will have the following basic structure:

-   `index.html`: Main HTML file.
-   `src/`: Directory for your source code.
-   `README.md`: A README for the generated project.
